/**
 * Created by chouheiwa on 2018/7/6.
 */
import React, { Component } from 'react';
import Http from '../../baseFunction/http'
import Api from '../../baseFunction/api'
import { Button, Modal, Form, Icon, Input, Switch} from 'antd';

const FormItem = Form.Item;

class AddChain extends Component {
    state = {
        isAdd : true,//是增加还是修改
        needShowModal : true,//是否需要显示模态
        getChainButtonLoading:false,//获取按钮是否正在加载
        confirmLoading:false,//确认按钮是否正在加载
        data : {
            id : "",
            chainAlies : "",
            chainWebsocket : "",
            chainPrefix : "",
            chainId : "",
            testChain : false
        }
    };

    constructor(props) {
        super(props);

        this.state.isAdd = props.data == null;

        if (!this.state.isAdd) {
            props.data.testChain = props.data.testChain === '测试';
            this.state.data = props.data;
        }
    }

    cacheState = this.state;

    getWebsocket = () => {
        this.props.form.validateFields(["chainWebsocket"],{},(err,value)=>{
            if (err) return;
            this.changeChainButtonLoadingState(true);
            Http.post(Api.getChainId(value.chainWebsocket),(data) => {
                this.changeChainButtonLoadingState(false);
                this.props.form.setFieldsValue({chainId:data});
            },(msg) => {
                this.changeChainButtonLoadingState(false);
                const ref = Modal.error({
                    okText:"确定",
                    title:msg,
                    onOK:()=>{
                        ref.destroy();
                    }
                });
            })
        });
    };

    changeChainButtonLoadingState = (isLoading) => {
        this.cacheState.getChainButtonLoading = isLoading;
        this.setState(this.cacheState);
    };

    changeModalConfirmButtonLoadingState = (isLoading) => {
        this.cacheState.confirmLoading = isLoading;
        this.setState(this.cacheState);
    };

    handleCancel = () => {
        this.cacheState.needShowModal = false;
        this.setState(this.cacheState);
    };

    handleClick = () => {
        this.props.form.validateFields((err,values)=>{
            if (err) {
                return;
            }
            this.changeModalConfirmButtonLoadingState(true);

            var createApi = this.state.isAdd?Api.createChain():Api.updateChain();

            if (values.testChain == null) values.testChain = false;

            values.testChain = !values.testChain;

            values.id = this.state.data.id;

            console.log(values);

            createApi.paramter = values;

            Http.post(createApi,(data)=>{
                this.handleCancel();
            },(msg)=>{
                this.changeModalConfirmButtonLoadingState(false);
                const ref = Modal.error({
                    okText:"确定",
                    title:msg,
                    onOK:()=>{
                        ref.destroy();
                    }
                });
            });
        });
    };

    afterClose = () => {
        Http.needLogin.base.props.history.push('/home/chainTable');
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        var title = this.state.isAdd?"增加新链":"修改链信息";
        var buttonFont = 16;
        return (
            <Modal title={title}
                   visible={this.state.needShowModal}
                   onCancel={this.handleCancel}
                   afterClose={this.afterClose}
                   okText="确定"
                   cancelText="取消"
                   onOk={this.handleClick}
                   confirmLoading = {this.state.confirmLoading}
            >
                <Form>
                    <FormItem>
                        {getFieldDecorator('chainAlies', {
                            rules: [{ required: true, message: '请输入链备注' }],
                            initialValue: this.state.data.chainAlies,
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: buttonFont }} />} placeholder="链备注" />
                        )}
                    </FormItem>

                    <FormItem>
                        {getFieldDecorator('chainWebsocket', {
                            rules: [{ required: true, message: '请输入合法区块链节点地址' ,pattern:/[ws|wss]+:\/\/[^\s]*$/}],
                            initialValue: this.state.data.chainWebsocket,
                        })(
                            <Input prefix={<Icon type="desktop" style={{ fontSize: buttonFont }}/>} placeholder="节点地址" />
                        )}
                    </FormItem>

                    <FormItem>
                        {getFieldDecorator('chainPrefix', {
                            rules: [{ required: true, message: '请输入请输入区块链公钥前缀!' }],
                            initialValue: this.state.data.chainPrefix,
                        })(
                            <Input prefix={<Icon type="wallet" style={{ fontSize: buttonFont }} />} placeholder="公钥前缀" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('chainId', {
                            rules: [{ required: true, message: '请获取链id' }],
                            initialValue: this.state.data.chainId
                        })(
                            <Input prefix={<Icon type="idcard" style={{ fontSize: buttonFont }} />} addonAfter={
                                <Button size="small" type="dash" onClick={this.getWebsocket} loading={this.state.getChainButtonLoading}>获取</Button>
                            } placeholder="链id" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('testChain', {})(
                            <Switch checkedChildren="正式链" unCheckedChildren="测试链" defaultChecked={
                                this.state.data.testChain
                            } />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    };
}

export default Form.create()(AddChain);