
import {put} from 'redux-saga/effects';
import axios from '../../axios-orders';
import * as Action from '../actions/index';

export function* initialIngredSaga(action){
    const response = yield axios.get('https://react-my-buger-39194-default-rtdb.firebaseio.com/ingredients.json')
    yield put(Action.ingredientFetch(response.data));
   
}