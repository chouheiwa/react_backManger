/**
 * Created by chouheiwa on 2018/7/5.
 */
import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import BaseFunction from '../../baseFunction'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const MenuItem = Menu.Item;
class TopMenu extends React.Component {
    state = {
        current: '/home/chainTable',
    };

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
        BaseFunction.Http.needLogin.base.props.history.push(e.key);
    };

    componentWillMount () {
        this.setState({
            current: window.location.pathname.split('?')[0]
        });
    };

    componentWillReceiveProps() {
        this.setState({
            current: window.location.pathname.split('?')[0]
        });
    };

    render() {
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
            >
                <SubMenu title={<span><Icon type="appstore" />区块链管理</span>}>
                    <MenuItem key={BaseFunction.JumpRouter.chainTabel}>
                        <span>
                            区块链信息
                        </span>
                    </MenuItem>
                    <MenuItem key={BaseFunction.JumpRouter.addChain}>
                        <span><Icon type="plus" />增加新链</span>
                    </MenuItem>
                </SubMenu>
                <SubMenu title={<span><Icon type="appstore" />区块链操作</span>}>
                    <MenuItem key={BaseFunction.JumpRouter.chainActionGetPrivateKey}>
                        <span>速记词生成私钥</span>
                    </MenuItem>
                    <MenuItem key={BaseFunction.JumpRouter.chainActionTransfer}>
                        <span>转账</span>
                    </MenuItem>
                    <MenuItem key={BaseFunction.JumpRouter.chainActionCreateAsset}>
                        <span>创建新资产</span>
                    </MenuItem>
                    <MenuItem key={BaseFunction.JumpRouter.chainActionIssueAsset}>
                        <span>非智能资产发放</span>
                    </MenuItem>
                </SubMenu>
            </Menu>
        );
    }
}

export default TopMenu;


