/**
 * Created by flh on 2018/7/9.
 */
import React, { Component } from 'react';
import {Form, Icon ,Select} from 'antd';
import BaseFunction from '../../baseFunction'

import BaseAction from './BaseAction'

const Option = Select.Option;
const FormItem = Form.Item;
class CreateAssetAction extends Component {
    state = {
        loadingData : false,
        confirmButtonLoading : false,
    };

    baseAction = new BaseAction(this,"发行新资产",true);

    constructor(props) {
        super(props);

        const widthStyle = {width: "400px"};
        const buttonFont = 20;
        const formatFunction = value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const parseFunction = value => value.replace(/\$\s?|(,*)/g, '');
        const functionEmpty = value => {};
        const parseEmpty = value => value;

        const {getFieldDecorator} = this.props.form;
        this.baseAction.generateApi = BaseFunction.Api.actionCreateAsset();
        this.baseAction.needItems = () => {
            return [
                this.baseAction.generateFormItemInput('assetSymbol',true,'请输入发行资产符号!',widthStyle,<Icon type="desktop" style={{ fontSize: buttonFont }}/>,'发行资产符号'),
                this.baseAction.generateFormItemInputNumber('precision',true,'请输入发行资产有效位!',widthStyle,"发行资产有效位",functionEmpty,parseEmpty,8,1,0),
                this.baseAction.generateFormItemInputNumber('maxSupply',true,'请输入发行资产最大供应量!',widthStyle,"资产最大供应量",formatFunction,parseFunction,100000000000 ,1,0),
                this.baseAction.generateFormItemInputNumber('baseAmount',true,'请输入基础币种兑换数量!',widthStyle,"基础币种兑换数量(如CNY的价格为2个BDS,则此处填2)",functionEmpty,parseEmpty,1000,1,0),
                this.baseAction.generateFormItemInputNumber('quoteAmount',true,'请输入此币种兑换数量!',widthStyle,"此币种兑换数量(如CNY的价格为2个BDS,则此处填1)",functionEmpty,parseEmpty,1000,1,0),
                <FormItem  key='bitAsset'>
                    {getFieldDecorator('bitAsset', {
                        rules: [{ required: true, message: '请选择资产类型!' }],
                    })(
                        <Select style={{ width: 400 }} placeholder="选择一个资产类型">
                            <Option value={1}>智能资产</Option>
                            <Option value={0}>用户发行资产</Option>
                        </Select>
                    )}
                </FormItem>
            ];
        };
    }

    componentWillReceiveProps() {
        this.baseAction.loadData();
    }

    componentWillMount () {
        this.baseAction.loadData();
    }

    render() {
        return this.baseAction.render();
    };
}

export default Form.create()(CreateAssetAction);