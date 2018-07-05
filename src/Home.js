import React, { Component } from 'react';
import TopMenu from './components/TopMenu/TopMenu'
import { BrowserRouter , Route} from 'react-router-dom'
import ChainTable from './components/ChainTable/ChainTable'
import Http from './baseFunction/http'
export default class Home extends Component {
    constructor(props) {
        super(props);
        Http.needLogin.base = this;
    }


    render() {
        console.log(this.props.match.params.selectKey);

        return (
            <div>
                <TopMenu />
            </div>
        );
    }
}