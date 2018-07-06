/**
 * Created by flh on 2018/7/5.
 */
import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import Http from '../../baseFunction/http'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const MenuItem = Menu.Item;
class TopMenu extends React.Component {
    state = {
        current: '/home/chainTable',
    }

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
        Http.needLogin.base.props.history.push(e.key);
    }

    componentWillMount () {
        this.setState({
            current: window.location.pathname.split('?')[0]
        });
    }

    componentWillReceiveProps() {
        this.setState({
            current: window.location.pathname.split('?')[0]
        });
    }

    render() {
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
            >
                <SubMenu title={<span><Icon type="appstore" />区块链管理</span>}>
                    <MenuItem key="/home/chainTable">
                        <span>
                            区块链信息
                        </span>
                    </MenuItem>
                    <MenuItem key="/home/chainTable/AddChain">
                        <span><Icon type="plus" />增加新链</span>
                    </MenuItem>
                </SubMenu>

            </Menu>
        );
    }
}

export default TopMenu;


