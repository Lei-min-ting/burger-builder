
import * as ActionType from '../actions/actionTypes';
import {updataObjected} from '../../share/utility';

const initialState = {
    token:null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath:'/'
}

const authLogOut = (state,action) =>{
    return updataObjected(state,{
        token:null,
        userId:null
    });
}

const authStar = (state,action)=>{
    return updataObjected(state,{error:null,loading:true});
}

const authSuccess = (state,action) =>{
    return updataObjected(state,{
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
}

const authFailed = (state,action) =>{
    return updataObjected(state,{
        error:action.error,
        loading:false
    })
}

const setAuthRedirect = (state,action) =>{
    return updataObjected(state,{
        authRedirectPath:action.path
    })
}

const Authreducer = (state = initialState,action) =>{
    switch(action.type){
        case ActionType.SUBMIT__AUTH_START: return authStar(state,action);
        case ActionType.SUBMIT_AUTH_SCUCCESS: return authSuccess(state,action);
        case ActionType.SUBMIT_AUTH_FAILED: return authFailed(state,action);
        case ActionType.USERLOGEOUT_SCUCCESS: return authLogOut(state,action);
        case ActionType.SET_AUTH_REDIRECT_PATH: return setAuthRedirect(state,action);
        default: return state;
    }
};

export default Authreducer;