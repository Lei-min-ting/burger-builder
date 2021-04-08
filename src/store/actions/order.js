import * as burgerBuildAction from './actionTypes';
import axios from '../../axios-orders';

export const orderIngreidentSuccess =(orderId,orderData)=>{
    return{
        type: burgerBuildAction.ORDER_INGREDIENTSUCCESS,
        Id: orderId,
        OrderData: orderData
    }
}

export const orderIngredientFailed = (error) =>{
    return{
        type: burgerBuildAction.ORDER_INGREDIENTFAILED,
        error:error
    }
}

export const burgerOderStart = () =>{
    return{
        type: burgerBuildAction.BURGER_ORDERSTART,
    }
}

export const burgerOrder = (orderData,token) =>{
    return{
        type: burgerBuildAction.BURGER_ORDER_SAGA,
        orderData: orderData,
        token: token
    }
    /*
      return dispatch =>{
        axios.post('/orders.json?auth='+ token,orderData)
            .then(response=>{
                dispatch(orderIngreidentSuccess(response.data.name,orderData));
            })
            .catch(error=> {
                dispatch(orderIngredientFailed(error));
            });
    }
     */
   
}

export const fetchOrderdataSuccess = (orders)=>{
    return{
        type:burgerBuildAction.FETCHDATA_SECCUSS,
        Orders:orders
    }
}

export const fetchOrderdataFailed = (error) =>{
    return{
        type:burgerBuildAction.ORDER_INGREDIENTFAILED,
        error: error
    }
}

export const fetchOrderStart =()=>{
    return{
        type:burgerBuildAction.FETCHDATA_START,
    }
}

export const fetchOrder = (token,userId) =>{
    return{
        type: burgerBuildAction.FATECH_ORDER_SAGA,
        token: token,
        userId: userId
    }
    /*
    
     
     return dispatch=>{
        const queryParmas = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'; 
        axios.get('/orders.json'+ queryParmas)
            .then(res=>{
                console.log(res.data)
                const fetchOrders = []
                for(let key in res.data){
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrderdataSuccess(fetchOrders));
            })
            .catch(err=>{
                dispatch(fetchOrderdataFailed);
            })
    }
    */
   
}