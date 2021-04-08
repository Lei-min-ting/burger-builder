import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import reducer from './store/reducers/burgerBuilderReducer';
import order from './store/reducers/order';
import thunk from 'redux-thunk';
import Authreducer from './store/reducers/Auth';
import createSagaMiddleware from 'redux-saga';
import {watchAuth,watchBurgerBuild,watchOrder} from '../src/store/saga/index'

const rootReducer = combineReducers({
    bugerBuider: reducer,
    order: order,
    Auth: Authreducer
})
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =process.env.NODE_ENV ==='development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;
const store = createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk,sagaMiddleware)
));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuild);
sagaMiddleware.run(watchOrder);

const app = (
    <Provider store ={store}>
        <BrowserRouter>
        <App/>
        </BrowserRouter>
    </Provider>
);


ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
