/*
redux 核心部分
*/

//向外暴露store对象

import {applyMiddleware, createStore} from "redux";
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducers from './reducers'

export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))