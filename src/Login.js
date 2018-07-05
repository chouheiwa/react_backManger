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

        http.post(api.login(this.updateData.userName,this.updateData.password),function (data) {
            console.log(data);
            console.log(this);
            tag.props.history.push('/home');
        },function (msg) {
            console.log(msg);
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

        return (
            <div className="login">
                <h1>链猫科技区块链后台管理</h1>
                <div className="login-form">
                    <div className="login-logo"><img src={require('./images/cam.png')} className="img-responsive" alt="" /></div>
                    <Form onSubmit={()=>{
                        this.submitAction();
                    }} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 14 }} />} placeholder="请输入用户名" />
                            )}
                        </FormItem>

                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 14 }} />} type="password" placeholder="请输入密码" />
                            )}
                        </FormItem>


                    </Form>

                </div>
            </div>
        );
    }
}

export default Form.create()(Login);
