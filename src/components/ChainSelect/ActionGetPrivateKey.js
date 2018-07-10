/**
 * Created by flh on 2018/7/10.
 */
import React, { Component } from 'react';
import {Form, Icon ,Select} from 'antd';

import BaseFunction from '../../baseFunction'
import BaseAction from './BaseAction'

class ActionGetPrivateKey extends Component {
    state = {
        loadingData : false,
        confirmButtonLoading : false,
    };

    baseAction = new BaseAction(this,"速记词生成私钥",false);

    constructor(props) {
        super(props);

        const widthStyle = {width: "400px"};
        const buttonFont = 20;

        this.baseAction.generateApi = BaseFunction.Api.actionGetPrivatekey();

        this.baseAction.needItems = () => {
            return [
                this.baseAction.generateFormItemInput('brainKey',true,'请输入速记词',widthStyle,<Icon type="desktop" style={{ fontSize: buttonFont }}/>,"私钥速记词")
            ];
        };
    }

    render() {
        return this.baseAction.render();
    }

}

export default Form.create()(ActionGetPrivateKey);