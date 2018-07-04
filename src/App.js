import React, { Component } from 'react';
import './App.css';
import http from './baseFunction/http'
import api from  './baseFunction/api'

import ComponentTextfield from './components/Textfield'
class App extends Component {
    constructor(props) {
        super(props);

        this.updateData = {};
    }

    submitAction() {
        console.log(this);

        http.post(api.login(this.updateData.userName,this.updateData.password),function (data) {
            console.log(data);
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
        return (
            <div>
                <h1>链猫科技区块链后台管理</h1>
                <div className="app-cam">
                    <div className="cam"><img src={require('./images/cam.png')} className="img-responsive" alt="" /></div>
                    <form>
                        <ComponentTextfield
                            data={
                            {
                                'security':false,
                                'placeholder':"用户名",
                                'text':""
                            }}
                            textChange={(text) => {
                                this.textChange(text,0);
                            }}
                        />
                        <ComponentTextfield
                            data={
                            {
                                'security':true,
                                'placeholder':"密码",
                                'text':""
                            }}
                            textChange={(text) => {
                                this.textChange(text,1);
                            }}
                        />
                        <div className="buttons"><input type="button" value="点击登录" onClick={() => {
                            this.submitAction();
                        }}/></div>
                        <div className="clear"></div>
                        <div className="clear"></div>
                        <div className="clear"></div>
                        <div className="new">
                            <p><a>忘记密码</a></p>
                            <p className="sign"><a href="page/register.jsp">立即注册</a></p>
                            <div className="clear"></div>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}

export default App;
