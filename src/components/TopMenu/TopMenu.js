/**
 * Created by flh on 2018/7/5.
 */
import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const MenuItem = Menu.Item;
class TopMenu extends React.Component {



    state = {
        current: 'ChainManage',
    }

    handleClick = (e) => {
        console.log(e);
        this.setState({
            current: e.key,
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
                    <MenuItem key="ChainManager/Info">
                        <span>
                            区块链信息
                        </span>
                    </MenuItem>
                    <MenuItem key="ChainManager/Add">
                        <span><Icon type="plus" />增加新链</span>
                    </MenuItem>
                </SubMenu>

            </Menu>
        );
    }
}

export default TopMenu;


