import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { BrowserRouter , Route} from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';

import './index.css';
import Home from './Home';
import Login from './Login';

import registerServiceWorker from './registerServiceWorker';

render((
    <BrowserRouter>
        <div>
            <Route exact path="/" component={Login}/>
            <Route path="/home" component={Home}/>
        </div>
    </BrowserRouter>
),document.getElementById('root'));
registerServiceWorker();
