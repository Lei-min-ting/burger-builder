import * as burgerBuildAction from '../actions/actionTypes';
import {updataObjected}  from '../../share/utility';

const initialState = {
    orders:[],
    loading:false
}

const burgerOrderReducer = (state=initialState,action)=>{
    switch(action.type){
        case burgerBuildAction.BURGER_ORDERSTART:
            return updataObjected(state,{loading:true});
           /* return{
                ...state,
                loading: true
            }*/
            
        case burgerBuildAction.ORDER_INGREDIENTSUCCESS:
            const newOrder = updataObjected(action.orderData,{id:action.orderId});
            return updataObjected(state,{
                loading:false,
                orders: state.orders.concat(newOrder)
            });
            /*const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            return{
                ...state,
                loading:false,
                orders: state.orders.concat(newOrder)
            }*/

        case burgerBuildAction.ORDER_INGREDIENTFAILED:
            return updataObjected(state,{loading:false});
           /* return{
                ...state,
                loading:false,
            }*/
        case burgerBuildAction.FETCHDATA_SECCUSS:
            return updataObjected(state,{
                orders:action.Orders,
                loading:false
            });
           /* return{
                ...state,
                orders:action.Orders,
                loading:false
            }*/
        case burgerBuildAction.FETCHDATA_FAILED:
            return updataObjected(state,{loading:true});
            /*return{
                ...state,
                loading:true
            }*/
        default:
            return state
    }
}

export default burgerOrderReducer;