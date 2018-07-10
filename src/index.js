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
import ChainUserTable from './components/ChainUserTable/ChainUserTable'
import ChangeChainUser from './components/ChainUserTable/ChangeChainUser'
import TransferAction from './components/ChainSelect/TransferAction'
import CreateAssetAction from './components/ChainSelect/CreateAssetAction'
import IssueAssetAction from './components/ChainSelect/IssueAssetAction'
import ActionGetPrivateKey from './components/ChainSelect/ActionGetPrivateKey'

import BaseFunction from './baseFunction'


import registerServiceWorker from './registerServiceWorker';

render((
    <BrowserRouter>
        <div style={{height: '100%'}}>
            <Route exact path={BaseFunction.JumpRouter.login} component={Login}/>
            <Route path={BaseFunction.JumpRouter.home} component={Home} />
            <Route path={BaseFunction.JumpRouter.chainTabel} component={ChainTable}/>
            <Route path={BaseFunction.JumpRouter.addChain} component={AddChain}/>
            <Route path={BaseFunction.JumpRouter.chainUserTable} component={ChainUserTable}/>
            <Route path={BaseFunction.JumpRouter.addChainUser} component={ChangeChainUser}/>
            <Route path={BaseFunction.JumpRouter.chainActionTransfer} component={TransferAction}/>
            <Route path={BaseFunction.JumpRouter.chainActionCreateAsset} component={CreateAssetAction}/>
            <Route path={BaseFunction.JumpRouter.chainActionIssueAsset} component={IssueAssetAction}/>
            <Route path={BaseFunction.JumpRouter.chainActionGetPrivateKey} component={ActionGetPrivateKey}/>
        </div>
    </BrowserRouter>
),document.getElementById('root'));
registerServiceWorker();
