/**
 * Created by chouheiwa on 2018/7/5.
 */
import React, { Component } from 'react';
import { Table , Button, Divider, Modal, Spin } from 'antd';
import Http from '../../baseFunction/http';
import Api from '../../baseFunction/api';
import AddChain from './AddChain';
import JumpRouter from '../../baseFunction/JumpRouter'
import { Link } from "react-router-dom";

class ChainTable extends React.Component {

    state = {
        needShowModal: false,
        needShowChange: false,
        isLoading: false,
        totalData: [],
        selectedData:this.selectedData,// Check here to configure the default column
    };

    cacheState = this.state;

    constructor(props) {
        super(props);
        this.columns = [{
            title: '区块链备注',
            dataIndex: 'chainAlies',
            key: 'chainAlies',
        }, {
            title: '公钥前缀',
            dataIndex: 'chainPrefix',
            key: 'chainPrefix',
        }, {
            title: '节点地址',
            dataIndex: 'chainWebsocket',
            key: 'chainWebsocket',
        }, {
            title: '链id',
            dataIndex: 'chainId',
            key: 'chainId',
        }, {
            title: '类型',
            dataIndex: 'testChain',
            key: 'testChain',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return (
                    <span>
                        <Button type="primary" onClick={()=>{
                            this.selectedData = record;
                            this.cacheState.selectedData = record;
                            this.needChangeRow();
                        }}>修改</Button>
                        <Divider type="vertical"/>
                        <Link to={JumpRouter.chainUserTable + "?id=" + record.id}>管理链用户</Link>
                        <Divider type="vertical"/>
                        <Button type="danger" onClick={()=>{
                            this.selectedData = record;
                            this.needDeleteRow();
                        }}>删除</Button>
                    </span>
                );
            },
        }];
    }

    selectedData = {};
    //通过id删除行
    needDeleteRow = () => {
        this.cacheState.needShowModal = true;

        this.setState(this.cacheState);
    };

    needChangeRow = () => {
        this.cacheState.needShowChange = true;

        this.setState(this.cacheState);
    };

    handleCancel = () => {
        this.cacheState.needShowModal = false;

        this.setState(this.cacheState);
    };

    actionOK = () => {
        console.log("调用了");

        this.cacheState.isLoading = true;
        this.setState(this.cacheState);
        Http.post(Api.deleteChain(this.selectedData.id),(data) =>{
            this.onNeedLoad();
        },(msg) => {
            console.log(msg);
        });
    };
    componentWillReceiveProps() {
        this.cacheState.needShowChange = false;
        this.setState(this.cacheState);
        this.onNeedLoad();
    }
    componentWillMount () {
        this.onNeedLoad();
    }
    //页面显示数量
    onNeedLoad() {
        this.cacheState.isLoading = true;

        this.setState(this.cacheState);

        Http.post(Api.getAllChains(),
            (data) =>
            {
                for (var i = 0;i < data.length;i ++) {
                    data[i].key = data[i].id;

                    data[i].testChain = data[i].testChain?"测试":"正式";
                }

                this.cacheState.totalData = data;
                this.cacheState.isLoading = false;
                this.cacheState.needShowModal = false;
                this.setState(this.cacheState);
            },function (msg) {
                console.log(msg);
            });
    }

    render() {
        const selectDom = this.state.needShowChange?<AddChain data={this.state.selectedData}/>:<div />;

        return (
            <Spin spinning={this.state.isLoading} size="large">
                <Table key="rowKey" columns={this.columns} dataSource={this.state.totalData} />
                <Modal title="提示"
                       visible={this.state.needShowModal}
                       onCancel={this.handleCancel}
                       footer={[
                           <Button key="back" onClick={this.handleCancel}>取消</Button>,
                           <Button key="submit" type="danger" onClick={this.actionOK}>删除</Button>,
                       ]}
                >
                    <p>删除这条链将同时删除您在这条链下的所有用户,您确定要删除么?</p>
                </Modal>

                {selectDom}
            </Spin>
        );
    }
}

export default ChainTable;