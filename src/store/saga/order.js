import axios from '../../axios-orders';
import {put} from 'redux-saga/effects';
import * as Action from '../actions/index';

export function* fetechOrderSaga(action){
    yield put(Action.fetchOrderStart())
    const queryParmas = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';   
    try{
        const res = yield axios.get('/orders.json'+ queryParmas)
        const fetchOrders = []
        for(let key in res.data){
                 fetchOrders.push({
                ...res.data[key],
                id: key
            });
        }
        yield put(Action.fetchOrderdataSuccess(fetchOrders));
    }catch(error){
        yield put(Action.fetchOrderdataFailed(error))
    }
     
}

export function* burgerOrderSaga(action){
    const response = yield axios.post('/orders.json?auth='+ action.token,action.orderData)
    try{
        yield put(Action.orderIngreidentSuccess(response.data.name,action.orderData));
    }catch(error){
        yield put(Action.orderIngredientFailed(error));
    }

}