/**
 * Created by flh on 2018/7/9.
 */
import React, { Component } from 'react';
import {Form, Input, Icon, Button , Modal , Select} from 'antd';
import BaseFunction from '../../baseFunction'

import ChainSelect from './ChainSelect'

import BaseAction from './BaseAction'

const Option = Select.Option;
const FormItem = Form.Item;
class IssueAssetAction extends Component {
    state = {
        loadingData : false,
        confirmButtonLoading : false,
    };

    baseAction = new BaseAction(this,"非智能资产发放",true);

    constructor(props) {
        super(props);

        const widthStyle = {width: "400px"};
        const buttonFont = 20;
        const formatFunction = value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const parseFunction = value => value.replace(/\$\s?|(,*)/g, '');

        this.baseAction.generateApi = BaseFunction.Api.actionIssueAsset();
        this.baseAction.needItems = () => {
            return [
                this.baseAction.generateFormItemInput('toAccount',true,'请输入收款账户!',widthStyle,<Icon type="desktop" style={{ fontSize: buttonFont }}/>,"收款账户"),
                this.baseAction.generateFormItemInput('symbol',true,'请输入发放币种!',widthStyle,<Icon type="desktop" style={{ fontSize: buttonFont }}/>,"发放币种(如BTC)"),
                this.baseAction.generateFormItemInput('amount',true,'请输入发放币种数量!',widthStyle,<Icon type="desktop" style={{ fontSize: buttonFont }}/>,"发放币种数量"),
                this.baseAction.generateFormItemInput('memo',false,'',widthStyle,<Icon type="desktop" style={{ fontSize: buttonFont }}/>,"发放备注"),
            ];
        };

    };
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

export default Form.create()(IssueAssetAction);