import reducer from './Auth';
import * as actionTypes from '../actions/actionTypes';


describe('auth reducer',()=>{
    it('should return initial state',()=>{
        expect(reducer(undefined,{})).toEqual({
            token:null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath:'/'
        })
    });
    it('should store token upon login',()=>{
        expect(reducer({
            token:null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath:'/'
        },{ type: actionTypes.SUBMIT_AUTH_SCUCCESS,
            idToken: 'some-token',
            userId: 'some-user-id'})).toEqual({
                token:'some-token',
                userId: 'some-user-id',
                error: null,
                loading: false,
                authRedirectPath:'/'
            })
    })
});