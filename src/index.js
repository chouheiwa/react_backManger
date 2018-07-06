import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { BrowserRouter , Route} from 'react-router-dom'
import { browserHistory } from 'react-router';

// import './index.css';
import Home from './Home';
import Login from './Login';
import ChainTable from './components/ChainTable/ChainTable';
import AddChain from './components/ChainTable/AddChain'

import registerServiceWorker from './registerServiceWorker';

render((
    <BrowserRouter history={browserHistory}>
        <div style={{height: '100%'}}>
            <Route exact path="/login" component={Login}/>
            <Route path="/home/:selectKey" component={Home} />
            <Route path="/home/chainTable" component={ChainTable}/>
            <Route path="/home/chainTable/AddChain" component={AddChain}/>
        </div>
    </BrowserRouter>
),document.getElementById('root'));
registerServiceWorker();
