/**
 * Created by flh on 2018/7/10.
 */
/**
 * Created by flh on 2018/7/9.
 */
import React, { Component } from 'react';
import {Form, Input, Icon, Button , Modal, InputNumber ,Select} from 'antd';
import BaseFunction from '../../baseFunction'

import ChainSelect from './ChainSelect'

const FormItem = Form.Item;
class BaseAction {
    state = {
        loadingData : false,
        confirmButtonLoading : false,
    };
    needChainSelect : true;
    componment = {};
    title : "";
    constructor(base,title,needChainSelect) {
        this.props = base.props;

        this.title = title;
        this.componment = base;



        if (needChainSelect !== null) this.needChainSelect = needChainSelect;

        this.chainSelect = new ChainSelect(base);
    }

    loadData = () => {
        this.chainSelect.onNeedLoad();
    }

    changeConfirmButtonLoadingState = (isLoading)=> {
        this.state.confirmButtonLoading = isLoading;
        this.componment.setState(this.state);
    }

    needItems = () => {
        return [];
    };

    generateApi = {
        paramter : {},
        apiLocation : ""
    };

    buttonClick = () => {
        this.props.form.validateFields((err,values)=>{
            if (err) return;

            var api = this.generateApi;
            api.paramter = values;

            this.changeConfirmButtonLoadingState(true);

            BaseFunction.Http.post(api,(data) => {
                this.changeConfirmButtonLoadingState(false);
                const ref = Modal.success({
                    okText:"确定",
                    title:data == null?"操作成功":data,
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

    generateFormItemInput = (uploadKey,required,showMessage,widthStyle,icon,placeholder) => {
        const {getFieldDecorator} = this.props.form;
        return (
            <FormItem key={uploadKey}>
                {getFieldDecorator(uploadKey, {
                    rules: [{ required: required, message: showMessage }],
                })(
                    <Input style={widthStyle} prefix={icon} placeholder={placeholder} />
                )}
            </FormItem>
        );
    };

    generateFormItemInputNumber = (uploadKey,required,showMessage,widthStyle,placeholder,formatter,parser,max,min,precision) => {
        const {getFieldDecorator} = this.props.form;
        return (
            <FormItem key={uploadKey}>
                {getFieldDecorator(uploadKey, {
                    rules: [{ required: required, message: showMessage }],
                })(
                    <InputNumber style={widthStyle}
                                 max={max} min={min}
                                 precision={precision}
                                 placeholder={placeholder}
                                 formatter={formatter}
                                 parser={parser}/>
                )}
            </FormItem>
        );
    };

    render() {

        const renderArray = this.needChainSelect?this.chainSelect.renderArray():null;

        return (
            <div style={{margin:"40px 0px 0px 0px"}}>
                <div style={{textAlign:"center"}}>
                    <h3>{this.title}</h3>
                    <Form>
                        {renderArray}
                        {this.needItems()}
                        <FormItem>
                            <Button type="primary" onClick={this.buttonClick} style={{width: '400px'}} loading={this.state.confirmButtonLoading}>
                                确认
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}
export default BaseAction;