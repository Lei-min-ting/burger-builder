import {put,delay} from 'redux-saga/effects';
import * as ActionType from '../actions/actionTypes';
import * as Action from '../actions/index';
import axios from '../../axios-orders';

export function* logoutSaga(action){
    yield localStorage.removeItem('expirationData');
    yield localStorage.removeItem('userId');
    yield localStorage.removeItem('token');
    yield put({
        type: ActionType.USERLOGEOUT_SCUCCESS
    }); 
}

export function* checkAuthTimeout(action){
    yield delay(action.expirationTime);
     yield put(Action.userLogout());
}

export function* authUser(action){
     yield put(Action.AuthStart());
       const authData = {
           email:action.email,
           password: action.password,
           returnSecureToken: true
       }
       let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA6ZuGZzNwkzmsF8Jf_NHHRu5yqaA4hnTc';
       if (!action.isSingup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA6ZuGZzNwkzmsF8Jf_NHHRu5yqaA4hnTc';
       }
       try{
        const response = yield axios.post(url,authData)
        const expirationData = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token',response.data.idToken);
        yield localStorage.setItem('expirationData',expirationData);
        yield localStorage.setItem('userId',response.data.localId);
        yield put(Action.AuthSuccess(response.data.idToken,response.data.localId));
        yield put(Action.checkAuthTimeout(response.data.expiresIn));
       }catch(error){
            yield put(Action.AuthFailed(error.response.data.error));
       }
 
}

export function* authAutoCheckSaga(action){
    const token = yield localStorage.getItem('token');
        
        if(!token){
            yield put(Action.userLogout()); 
        }else{
            const expirationDate = yield new Date(localStorage.getItem('expirationData'));
            if(expirationDate <= new Date()){
                yield put(Action.userLogout());
            }else{
                const userId = yield localStorage.getItem('userId');
                yield put(Action.AuthSuccess(token,userId));
                const expirationTime = (expirationDate.getTime() - new Date().getTime())/1000;
                yield put(Action.checkAuthTimeout(expirationTime));
            }
}
}