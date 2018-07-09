/**
 * Created by flh on 2018/7/9.
 */
import React, { Component } from 'react';
import {Form, Input, Icon, Button , Modal, InputNumber ,Select} from 'antd';
import BaseFunction from '../../baseFunction'

import ChainSelect from './ChainSelect'

const Option = Select.Option;
const FormItem = Form.Item;
class CreateAssetAction extends Component {
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

            var api = BaseFunction.Api.actionCreateAsset();
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
        const {getFieldDecorator} = this.props.form;
        const buttonFont = 20;

        const widthStyle = {width: "400px"};

        return (
            <div style={{margin:"40px 0px 0px 0px"}}>
                <div style={{textAlign:"center"}}>
                    <h3>发行新资产</h3>
                    <Form>
                        {this.chainSelect.renderArray()}
                        <FormItem>
                            {getFieldDecorator('assetSymbol', {
                                rules: [{ required: true, message: '请输入发行资产符号!' }],
                            })(
                                <Input style={widthStyle} prefix={<Icon type="desktop" style={{ fontSize: buttonFont }}/>} placeholder="发行资产符号" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('precision', {
                                rules: [{ required: true, message: '请输入发行资产有效位!' }],
                            })(
                                <InputNumber style={widthStyle} max={8} min={1} precision={0} placeholder="发行资产有效位" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('maxSupply', {
                                rules: [{ required: true, message: '请输入发行资产最大供应量!' }],
                            })(
                                <InputNumber style={widthStyle}
                                             max={10000000000} min={1}
                                             precision={0}
                                             placeholder="资产最大供应量"
                                             formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                             parser={value => value.replace(/\$\s?|(,*)/g, '')}/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('baseAmount', {
                                rules: [{ required: true, message: '请输入基础币种兑换数量!' }],
                            })(
                                <InputNumber style={widthStyle}
                                             max={1000} min={1}
                                             precision={0}
                                             placeholder="基础币种兑换数量(如CNY的价格为2个BDS,则此处填2)"
                                             formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                             parser={value => value.replace(/\$\s?|(,*)/g, '')}/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('quoteAmount', {
                                rules: [{ required: true, message: '请输入此币种兑换数量!' }],
                            })(
                                <InputNumber style={widthStyle}
                                             max={1000} min={1}
                                             precision={0}
                                             placeholder="此币种兑换数量(如CNY的价格为2个BDS,则此处填1)"
                                             formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                             parser={value => value.replace(/\$\s?|(,*)/g, '')}/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('bitAsset', {
                                rules: [{ required: true, message: '请选择资产类型!' }],
                            })(
                                <Select style={{ width: 400 }} placeholder="选择一个资产类型">
                                    <Option value={1}>智能资产</Option>
                                    <Option value={0}>用户发行资产</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('description', {
                                rules: [{ required: false, message: '请输入发行资产描述!' }],
                            })(
                                <Input style={widthStyle} prefix={<Icon type="desktop" style={{ fontSize: buttonFont }}/>} placeholder="发行资产描述" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.buttonClick} style={{width: '400px'}} loading={this.state.confirmButtonLoading}>
                                确认
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    };
}

export default Form.create()(CreateAssetAction);