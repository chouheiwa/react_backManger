/**
 * Created by flh on 2018/7/8.
 */
import { Select,Form } from 'antd';
import React, { Component } from 'react';

import BaseFunction from '../../baseFunction'

const Option = Select.Option;
const FormItem = Form.Item;
class ChainSelect {
    form = {};

    baseContext = {};

    cacheState = {};

    state = {};

    constructor(baseContext) {
        this.baseContext = baseContext;
        this.form = baseContext.props.form;

        this.cacheState = baseContext.state;
    }

    onNeedLoad = () => {
        BaseFunction.Http.post(BaseFunction.Api.getAllChains(),
            (data) =>
            {
                this.state.chainData = data;
                this.cacheState.isLoading = false;
                this.baseContext.setState(this.cacheState);
            },function (msg) {
                console.log(msg);
            });
    }

    selectChanged = (value) => {
        this.onNeedLoadUserData(value);
    };

    onNeedLoadUserData(selectChainId) {
        if (this.state.lastSelectChainId === selectChainId) return;

        BaseFunction.Http.post(BaseFunction.Api.selectChainUsers(selectChainId),(data) => {
            this.state.lastSelectChainId = selectChainId;
            this.state.chainUserData = data;
            this.cacheState.isLoading = false;
            this.baseContext.setState(this.cacheState);
        },(msg) => {
            console.log(msg);
        });
    }

    state = {
        chainData : [],
        chainUserData : [],
        lastSelectChainId : -1,
    };

    renderArray = () => {
        const { getFieldDecorator } = this.form;

        const {chainData,chainUserData} = this.state;

        const chainDataOptions = chainData.map((value) => {
            return <Option value={value.id} key={value.id}>{"节点地址:" + value.chainWebsocket + " 别名:" + value.chainAlies}</Option>
        });
        const chainUserDataOptions = chainUserData.map((value) => {
            return <Option value={value.id} key={value.id}>{"用户名:" + value.userName + " 别名:" + value.userAlies}</Option>
        });

        return [<FormItem key="rowKey">
                    {getFieldDecorator('chainTableId', {
                        rules: [{ required: true, message: '请选择区块链!' }],
                    })(
                        <Select style={{ width: 400 }} placeholder="选择一个区块链" onChange={this.selectChanged}>{chainDataOptions}</Select>
                    )}
                </FormItem>,
                <FormItem key="rowKey1">
                    {getFieldDecorator('chainUserId', {
                        rules: [{ required: true, message: '请选择区块链用户!' }],
                    })(
                        <Select style={{ width: 400 }} placeholder="选择一个区块链用户">{chainUserDataOptions}</Select>
                    )}
                </FormItem>];
    }
}

export default ChainSelect;