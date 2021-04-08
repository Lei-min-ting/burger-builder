import * as actionType from '../actions/actionTypes';
import {updataObjected} from '../../share/utility';

const initialState={
    ingredients:null,
    totalPrice: 4,
    building: false
}

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionType.Add_INGREDIENT:
            const updateIngredient = {[action.IngredientName]:state.ingredients[action.IngredientName] +1};
            const updataIngredients = updataObjected(state.ingredients,updateIngredient);
            const updataState = {
                ingredients: updataIngredients,
                totalPrice:state.totalPrice + INGREDIENT_PRICES[action.IngredientName],
                building:true
            }
            return updataObjected(state,updataState);

        case actionType.REMOVE_INGREDIENT:
            const updataIngredient2 = {[action.IngredientName]:state.ingredients[action.IngredientName] -1}
            const updataIngredients2 = updataObjected(state.ingredients,updataIngredient2);
            const updateState2 = {
                ingredients: updataIngredients2,
                totalPrice:state.totalPrice - INGREDIENT_PRICES[action.IngredientName],
                building:true
            }
            return updataObjected(state,updateState2);

        case actionType.SET_INGREDIENT:
            return updataObjected(state,{
                ingredients:action.ingredients,
                totalPrice:4,
                building:false
            })
            /*return{
                ...state,
                ingredients:action.ingredients,
                totalPrice:4

            }*/
        default:
            return state;
    }
}

export default reducer;