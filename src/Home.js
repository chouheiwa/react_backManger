import React, { Component } from 'react';
import TopMenu from './components/TopMenu/TopMenu'
import BaseFunction from './baseFunction'

export default class Home extends Component {
    constructor(props) {
        super(props);
        BaseFunction.Http.needLogin.base = this;
    }


    render() {
        return (
            <div>
                <TopMenu />
            </div>
        );
    }
}