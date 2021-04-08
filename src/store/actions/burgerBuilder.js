import * as burgerBuildAction from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) =>{
    return{
        type: burgerBuildAction.Add_INGREDIENT,
        IngredientName: name
    }
}

export const removeIngredient = (name) =>{
    return{
        type: burgerBuildAction.REMOVE_INGREDIENT,
        IngredientName: name
    }
}

export const ingredientFetch = (Ingredients)=>{
    return{
        type:burgerBuildAction.SET_INGREDIENT,
        ingredients: Ingredients
    }
}

export const initialingredient = ()=>{
    return{
        type:burgerBuildAction.INITIAL_INGREDIENT
    }
    /*
       return dispatch =>{
        axios.get('https://react-my-buger-39194-default-rtdb.firebaseio.com/ingredients.json')
        .then(response=>{
           dispatch(ingredientFetch(response.data));
        });
    } 
    */
    
}