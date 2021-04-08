import * as ActionType from './actionTypes';
import axios from '../../axios-orders';

export const userLogout = () =>{
    //localStorage.removeItem('token');
    //localStorage.removeItem('expirationData');
    //localStorage.removeItem('userId');
    return {
        type: ActionType.AUTH_INITITATE_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) =>{
    return{
        type:ActionType.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime * 1000
    }
    /*return dispatch =>{
        setTimeout(()=>{
            dispatch(userLogout())
        },expirationTime * 1000)
    }*/
}

export const AuthStart = () =>{
    return{
        type: ActionType.SUBMIT__AUTH_START,
    }
}

export const AuthSuccess = (IdToken,userId) =>{
    return{
        type: ActionType.SUBMIT_AUTH_SCUCCESS,
        idToken: IdToken,
        userId: userId
    }
}

export const AuthFailed = (error)=>{
    return{
        type: ActionType.SUBMIT_AUTH_FAILED,
        error:error
    }
}

export const Auth = (email,password,isSingup) =>{
    return {
        type:ActionType.AUTH_USER,
        email:email,
        password:password,
        isSingup: isSingup
    }

    /*
        return dispatch=>{
       dispatch(AuthStart());
       const authData = {
           email:email,
           password: password,
           returnSecureToken: true
       }
       let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA6ZuGZzNwkzmsF8Jf_NHHRu5yqaA4hnTc';
       if (!isSingup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA6ZuGZzNwkzmsF8Jf_NHHRu5yqaA4hnTc';
       }
       axios.post(url,authData)
            .then(response=>{
                console.log(response);
                const expirationData = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token',response.data.idToken);
                localStorage.setItem('expirationData',expirationData);
                localStorage.setItem('userId',response.data.localId);
                dispatch(AuthSuccess(response.data.idToken,response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err=>{
                dispatch(AuthFailed(err.response.data.error));
            });
    }
    
     */
    
}

export const setAuthRedirect = (path)=>{
    return{
        type:ActionType.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const authCheckState = () =>{
    return{
        type:ActionType.AUTH_AUTO_CHECK
    }
    /*
    return dispatch=>{
        const token = localStorage.getItem('token');
        
        if(!token){
            dispatch(userLogout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationData'));
            if(expirationDate <= new Date()){
                dispatch(userLogout());
            }else{
                const userId = localStorage.getItem('userId');
                dispatch(AuthSuccess(token,userId));
                const expirationTime = (expirationDate.getTime() - new Date().getTime())/1000;
                dispatch(checkAuthTimeout(expirationTime));
            }
        }
    }
     */
    
}