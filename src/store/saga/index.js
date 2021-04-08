import { takeEvery} from 'redux-saga/effects';
import * as actionType from '../actions/actionTypes';
import {logoutSaga,checkAuthTimeout,authUser,authAutoCheckSaga} from './Auth';
import { initialIngredSaga } from './burgerBuilder';
import {fetechOrderSaga,burgerOrderSaga} from './order';

export function* watchAuth(action){
    yield takeEvery(actionType.AUTH_INITITATE_LOGOUT,logoutSaga);
    yield takeEvery(actionType.AUTH_CHECK_TIMEOUT,checkAuthTimeout);
    yield takeEvery(actionType.AUTH_USER,authUser);
    yield takeEvery(actionType.AUTH_AUTO_CHECK,authAutoCheckSaga);
}

export function* watchBurgerBuild(action){
    yield takeEvery(actionType.INITIAL_INGREDIENT,initialIngredSaga);
}

export function* watchOrder(action){
    yield takeEvery(actionType.BURGER_ORDER_SAGA,burgerOrderSaga);
    yield takeEvery(actionType.FATECH_ORDER_SAGA,fetechOrderSaga);
}