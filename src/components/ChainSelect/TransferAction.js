/**
 * Created by flh on 2018/7/9.
 */
import React, { Component } from 'react';
import {Form, Input, Icon, Button ,Modal} from 'antd';
import BaseFunction from '../../baseFunction'

import BaseAction from './BaseAction'

const FormItem = Form.Item;
class TransferAction extends Component{
    state = {
        loadingData : false,
        confirmButtonLoading : false,
    };

    baseAction = new BaseAction(this,"转账");
    constructor(props) {
        super(props);

        const widthStyle = {width: "400px"};
        const buttonFont = 20;


        this.baseAction.needItems = () => {
            return [
                this.baseAction.generateFormItemInput('toAccount',true,'请输入收款账户!',widthStyle,<Icon type="desktop" style={{ fontSize: buttonFont }}/>,"收款账户"),
                this.baseAction.generateFormItemInput('symbol',true,'请输入转账币种!',widthStyle,<Icon type="bank" style={{ fontSize: buttonFont }}/>,"转账币种"),
                this.baseAction.generateFormItemInput('amount',true,'请输入转账金额!',widthStyle,<Icon type="red-envelope" style={{ fontSize: buttonFont }}/>,"转账金额"),
                this.baseAction.generateFormItemInput('memo',false,'请输入转账备注!',widthStyle,<Icon type="red-envelope" style={{ fontSize: buttonFont }}/>,"转账备注"),
            ];
        };
        this.baseAction.generateApi = BaseFunction.Api.actionTransfer();
    }
    componentWillReceiveProps() {
        this.baseAction.loadData();
    }

    componentWillMount () {
        this.baseAction.loadData();
    }

    render() {
        return this.baseAction.render();
    }
}

export default Form.create()(TransferAction);