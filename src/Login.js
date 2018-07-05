import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './Style/login.less'


import http from './baseFunction/http'
import api from  './baseFunction/api'

const FormItem = Form.Item;

class Login extends Component {
    constructor(props) {
        super(props);

        this.updateData = {};
    }

    submitAction() {
        var tag = this;

        tag.props.form.validateFields((err, values) => {
            if (err) return;
            http.post(api.login(values.userName,values.password),function (data) {
                console.log("登录成功");
                tag.props.history.push('/home/chainTable');
            },function (msg) {
                console.log(msg);
            });
        });


    }

    textChange(text,index) {
        if (index === 0) {
            this.updateData.userName = text;
        }else {
            this.updateData.password = text;
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        var buttonFont = 20;
        return (
            <div className="login">
                <div className="login-form">
                    <div className="login-logo"><span>区块链</span></div>
                    <Form style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: buttonFont }} />} placeholder="请输入用户名" />
                            )}
                        </FormItem>

                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: buttonFont }} />} type="password" placeholder="请输入密码" />
                            )}
                        </FormItem>

                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</a>
                            <Button type="primary" onClick={() => {
                                this.submitAction();
                            }} className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                            <p style={{display: 'flex', justifyContent: 'space-between'}}>
                                <a href="">注册</a>
                            </p>
                        </FormItem>
                    </Form>

                </div>
            </div>
        );
    }
}

export default Form.create()(Login);
