import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';


const orderSummer =(props)=>{
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey=>{
        return <li key ={igKey}>
            <span style = {{textTransform: 'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]}
        </li>
    });
    return(
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
            <p>Countinue to Checkout?</p>
            <Button btnType = "Danger" clicked = {props.purchaseCancled}>CEACEL</Button>
            <Button btnType = "Success" clicked = {props.purchaseContinued}>CONTINUE</Button>
        </Auxiliary>
    );
};

export default orderSummer;