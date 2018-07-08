/**
 * Created by chouheiwa on 2018/7/6.
 */

import React, { Component } from 'react';
import { Table , Button, Divider, Modal, Spin, Tag} from 'antd';
import Http from '../../baseFunction/http'
import Api from '../../baseFunction/api'
import QuerParam from '../../baseFunction/QueryParams'
import JumpRouter from '../../baseFunction/JumpRouter'

import ChangeChainUser from './ChangeChainUser'

class ChainUserTable extends React.Component {
    state = {
        isLoading: false,
        headerData: {
            chainAlies:"",
            chainWebsocket:"",
        },
        totalData: [],
        selectedData:null,
        changeData:false,
    };
    cacheState = this.state;

    lastChainId:0;

    constructor(props) {
        super(props);

        this.state.id = QuerParam.localQuery(this,"id");
        this.columns = [{
            title: '区块链用户备注',
            dataIndex: 'userAlies',
            key: 'userAlies',
        }, {
            title: '区块链用户名',
            dataIndex: 'userName',
            key: 'userName',
        }, {
            title: '区块链用户私钥',
            dataIndex: 'userPrivateKey',
            key: 'userPrivateKey',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return (
                    <span>
                        <Button type="primary" onClick={()=>{
                            this.selectedData = record;
                            this.cacheState.selectedData = record;
                            this.setState(this.cacheState);
                        }}>修改</Button>
                        <Divider type="vertical"/>
                        <Button type="danger" onClick={()=>{
                            this.selectedData = record;
                            this.deleteRow();
                        }}>删除</Button>
                    </span>
                );
            },
        }];
    }

    getHeaderData = () => {
        var id = QuerParam.localQuery(this,"id");

        if (this.cacheState.headerData.id !== id) {
            Http.post(Api.getChainById(id),(data) => {
                this.cacheState.headerData = data;
                this.setState(this.cacheState);
                this.getTableData();
            },this.dataError);
            return;
        }

        this.getTableData();

    };

    getTableData = () => {
        Http.post(Api.selectChainUsers(this.state.id),(data)=>{
            this.cacheState.totalData = data;
            this.setState(this.cacheState);
        },this.dataError);
    };

    dataError = (msg) => {
        const ref = Modal.error({
            okText:"确定",
            title:msg,
            onOk:()=>{
                Http.needLogin.base.props.history.replace(JumpRouter.chainTabel);
                ref.destroy();
            }
        });
    };

    addData = () => {
        this.props.history.push(JumpRouter.addChainUser + '?id=' + this.state.id);
    };

    componentWillMount () {
        this.getHeaderData();
    };

    componentWillReceiveProps() {
        this.cacheState.selectedData = null;
        this.setState(this.cacheState);
        this.getHeaderData();
    }

    generateSpan = (title,detail,tagColor) => {
        return (
            <span style={{fontSize:"20px"}}>{title}:  <Tag color={tagColor}>{detail}</Tag></span>
        );
    };

    deleteRow = () => {
        const ref = Modal.confirm({
            title:"此操作不可恢复,确定要删除么?",
            cancelText:"取消",
            okText:"确定",
            okType:"danger",
            onCancel: () => {
                ref.destroy();
            },
            onOk: () => {
                Http.post(Api.deleterChainUser(this.selectedData.id,this.selectedData.chainTableId), (data) => {
                    ref.destroy();
                    this.getHeaderData()
                },(msg) => {
                    const ref1 = Modal.error({
                        okText:"确定",
                        title:msg,
                        onOK:()=>{
                            ref1.destroy();
                        }
                    });
                })
            }
        });
    }

    render() {
        var title = this.state.headerData.chainAlies == null ? null : (
            <div style={{padding: "18px 6px 6px 18px", width: "100%"}}>
                {this.generateSpan("区块链别名", this.state.headerData.chainAlies, "magenta")}
                {this.generateSpan("区块链地址", this.state.headerData.chainWebsocket, "blue")}
                <Button type="primary" style={{float: "right"}} onClick={this.addData}>新建用户</Button>
            </div>

        );
        var modal = this.state.selectedData == null ? null : (
            <ChangeChainUser data={this.state.selectedData}/>
        );

        return (
            <div>
                {title}
                {modal}
                <Table key="rowKey" columns={this.columns} dataSource={this.state.totalData} />
            </div>
        );
    }

}
export default ChainUserTable;