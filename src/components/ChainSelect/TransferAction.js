/**
 * Created by flh on 2018/7/9.
 */
import React, { Component } from 'react';
import {Form, Input, Icon, Button ,Modal} from 'antd';
import BaseFunction from '../../baseFunction'

import ChainSelect from './ChainSelect'

const FormItem = Form.Item;
class TransferAction extends Component {
    state = {
        loadingData : false,
        confirmButtonLoading : false,
    };
    cacheState = this.state;

    constructor(props) {
        super(props);

        this.chainSelect = new ChainSelect(this);
    }

    changeConfirmButtonLoadingState = (isLoading)=> {
        this.cacheState.confirmButtonLoading = isLoading;
        this.setState(this.cacheState);
    }

    buttonClick = () => {
        this.props.form.validateFields((err,values)=>{
            if (err) return;

            console.log(values);

            var api = BaseFunction.Api.actionTransfer();
            api.paramter = values;

            this.changeConfirmButtonLoadingState(true);

            BaseFunction.Http.post(api,(data) => {
                this.changeConfirmButtonLoadingState(false);
                const ref = Modal.success({
                    okText:"确定",
                    title:"操作成功",
                    onOK:()=>{
                        ref.destroy();
                    }
                });
            },(msg) => {
                this.changeConfirmButtonLoadingState(false);
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


    render() {
        const { getFieldDecorator } = this.props.form;
        const buttonFont = 20;

        const widthStyle = {width: "400px"};

        return (
            <div style={{margin:"40px 0px 0px 0px"}}>
                <div style={{textAlign:"center"}}>
                    <h3>转账</h3>
                    <Form>
                        {this.chainSelect.renderArray()}
                        <FormItem>
                            {getFieldDecorator('toAccount', {
                                rules: [{ required: true, message: '请输入收款账户!' }],
                            })(
                                <Input style={widthStyle} prefix={<Icon type="desktop" style={{ fontSize: buttonFont }}/>} placeholder="收款账户" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('symbol', {
                                rules: [{ required: true, message: '请输入转账币种!' }],
                            })(
                                <Input style={widthStyle} prefix={<Icon type="bank" style={{ fontSize: buttonFont }}/>} placeholder="转账币种" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('amount', {
                                rules: [{ required: true, message: '请输入转账金额!' }],
                            })(
                                <Input style={widthStyle} prefix={<Icon type="red-envelope" style={{ fontSize: buttonFont }}/>} placeholder="转账金额" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('memo', {
                                rules: [{ required: false, message: '请输入转账备注!' }],
                            })(
                                <Input style={widthStyle} prefix={<Icon type="desktop" style={{ fontSize: buttonFont }}/>} placeholder="转账备注" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.buttonClick} className="login-form-button" style={{width: '400px'}} loading={this.state.confirmButtonLoading}>
                                确认
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>

        );
    }

}

export default Form.create()(TransferAction);