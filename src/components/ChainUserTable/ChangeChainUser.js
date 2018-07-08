/**
 * Created by chouheiwa on 2018/7/6.
 */
import React, { Component } from 'react';
import Http from '../../baseFunction/http'
import Api from '../../baseFunction/api'
import JumpRouter from '../../baseFunction/JumpRouter'
import QueryParams from '../../baseFunction/QueryParams'
import { Button, Modal, Form, Icon, Input, Switch} from 'antd';


const FormItem = Form.Item;
class ChangeChainUser extends Component {
    state = {
        isAdd : true,
        changeData : {},
        showModaling : true,
        showLoading : false,
        id:0,
    };
    cacheState = this.state;

    constructor(props) {
        super(props);

        this.state.isAdd = this.props.data == null;

        this.state.changeData = this.state.isAdd ? {} : this.props.data;

        this.state.id = QueryParams.localQuery(this,'id');
    }

    handleCancel = () => {
        this.cacheState.showModaling = false;
        this.setState(this.cacheState);
    };

    afterClose = () => {
        Http.needLogin.base.props.history.replace(JumpRouter.chainUserTable + '?id=' + this.state.id);
    };

    handleClick = () => {
        //请求网络数据
        this.props.form.validateFields((err,values)=>{
            if (err) {
                return;
            }

            values.chainTableId = this.state.id;

            if (!this.state.isAdd) {
                values.id = this.state.changeData.id;
            }

            this.changeConfirmLoading(true);

            var api = this.state.isAdd ? Api.createChainUser():Api.updateChainUser();

            api.paramter = values;

            Http.post(api ,
                (data) =>
                {
                    this.handleCancel();
                },(msg) =>
                {
                    this.changeConfirmLoading(false);
                    const ref = Modal.error({
                        okText:"确定",
                        title:msg,
                        onOK:()=>{
                            ref.destroy();
                        }
                    });
                }
            );
        });
    };

    changeConfirmLoading = (isLoading) => {
        this.cacheState.showLoading = isLoading;
        this.setState(this.cacheState);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        var title = this.state.isAdd?"增加新用户":"修改用户信息";
        var buttonFont = 16;

        return (
            <Modal title={title}
                   visible={this.state.showModaling}
                   onCancel={this.handleCancel}
                   afterClose={this.afterClose}
                   okText="确定"
                   cancelText="取消"
                   onOk={this.handleClick}
                   confirmLoading = {this.state.showLoading}
            >
                <Form>
                    <FormItem>
                        {getFieldDecorator('userAlies', {
                            rules: [{ required: true, message: '请输入用户别名' }],
                            initialValue: this.state.changeData.userAlies,
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: buttonFont }} />} placeholder="用户别名" />
                        )}
                    </FormItem>

                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入用户账户'}],
                            initialValue: this.state.changeData.userName,
                        })(
                            <Input prefix={<Icon type="desktop" style={{ fontSize: buttonFont }}/>} placeholder="用户账户" />
                        )}
                    </FormItem>

                    <FormItem>
                        {getFieldDecorator('userPrivateKey', {
                            rules: [{ required: true, message: '请输入请输入用户公钥!' }],
                            initialValue: this.state.changeData.userPrivateKey,
                        })(
                            <Input prefix={<Icon type="wallet" style={{ fontSize: buttonFont }} />} placeholder="用户公钥" />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    };
}

export default Form.create()(ChangeChainUser)