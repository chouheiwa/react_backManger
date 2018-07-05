/**
 * Created by flh on 2018/7/5.
 */
import React, { Component } from 'react';
import { Table , Pagination , Button, Divider, Icon, Modal, Spin} from 'antd';
import Http from '../../baseFunction/http'
import Api from '../../baseFunction/api'
const columns = [{
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
    render: (text, record) => (
        <span>
            <a href="javascript:;">管理链用户</a>
            <Divider type="vertical" />
            <a href="javascript:;" className="ant-dropdown-link">删除<Icon type="down" /></a>
        </span>
    ),
}];

class ChainTable extends React.Component {
    state = {
        totalCount: 100,
        pageSize: 10,
        totalPage: 500,
        currentPage: 3,
        isLoading: false,
        totalData: []// Check here to configure the default column
    };

    componentWillMount () {
        console.log("初始化了");
        this.onNeedLoad();
    }
    //页面显示数量
    onNeedLoad() {
        Http.post(Api.getAllChains(),
            (data) =>
            {
                for (var i = 0;i < data.length;i ++) {
                    data[i].key = data[i].id;

                    data[i].testChain = data[i].testChain?"测试":"正式";
                }
                var state = this.state;
                state.totalData = data;
                this.setState(state);
            },function (msg) {
                console.log(msg);
            });
    }

    render() {

        /*pagination={
        <Pagination showSizeChanger onShowSizeChange={(current,pageSize)=>{
            this.onShowSizeChange(current,pageSize);
        }} defaultCurrent={this.state.currentPage} total={this.state.totalPage} />
    }*/
        return (
            <Spin spinning={this.state.isLoading} size="large">
                <Table key="rowKey" columns={columns} dataSource={this.state.totalData} />

            </Spin>

        );
    }
}

export default ChainTable;