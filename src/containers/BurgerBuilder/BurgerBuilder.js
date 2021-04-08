import React, { Component } from 'react';
import Auxiliary from "../../hoc/Auxiliary";
import Burger from '../../components/Burger/Burger';
import BuidControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummery/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import {connect} from 'react-redux';

import * as burgerBuildAction from '../../store/actions/index';


class BurgerBuilder extends Component {
    state = {
        //ingredients:null,
        totalPrice:4,
        purchaseable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount(){
        this.props.onIngredientSet();
        //axios.get('https://react-my-buger-39194-default-rtdb.firebaseio.com/ingredients.json')
        //.then(response=>{
        //    this.setState({ingredients:response.data})
        //});
    }

    updataPurchaseState(ingredients){
       
        const sum = Object.keys(ingredients)
        .map(igKey=>{
            return ingredients[igKey];
        })
        .reduce((sum,el)=>{
            return sum + el;
        },0);
        return sum > 0
    }


    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing:true});
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () =>{
            this.props.history.push('/checkout');
    }

    render(){
        const disableInfo = {
            ...this.props.Ingrs
        };
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;
       // console.log(this.props.Ingrs);
        //console.log(this.props.onIngredientAdded);
        
        let burger = <Spinner/>;
        if(this.props.Ingrs){
            burger = (
                <Auxiliary>
                    <Burger ingredients = {this.props.Ingrs}/>
                            <BuidControls
                            ingredientAdded = {this.props.onIngredientAdded}
                            ingredientRemoved = {this.props.onIngredientRemoved}
                            disabled = {disableInfo}
                            price = {this.props.price}
                            purchaseble = {this.updataPurchaseState(this.props.Ingrs)}
                            isAuth = {this.props.isAuthenticated}
                            ordered = {this.purchaseHandler}/>
                </Auxiliary>
            );
            orderSummary = <OrderSummary ingredients = {this.props.Ingrs} 
            purchaseCancled = {this.purchaseCancelHandler}
            purchaseContinued = {this.purchaseContinueHandler}
            price = {this.props.price} />
        }

        if(this.state.loading){
            orderSummary = <Spinner/>
        }
         
        return(
                <Auxiliary>
                    <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                      {orderSummary}  
                    </Modal>
                    {burger}
                </Auxiliary>
        );
    }
}

const mapStateToReducer = state =>{
    return{
        Ingrs: state.bugerBuider.ingredients,
        price: state.bugerBuider.totalPrice,
        isAuthenticated : state.Auth.token !== null
    }
    
}

const mapDispatchToReducer = dispatch =>{
    return{
        onIngredientAdded: (IngresName)=> dispatch(burgerBuildAction.addIngredient(IngresName)),
        onIngredientRemoved: (IngresName)=>dispatch(burgerBuildAction.removeIngredient(IngresName)),
        onIngredientSet: ()=>dispatch(burgerBuildAction.initialingredient()),
        onSetAuthRedirectPath: (path)=>dispatch(burgerBuildAction.setAuthRedirect(path))
    }
    
}
export default connect(mapStateToReducer,mapDispatchToReducer)(withErrorHandler(BurgerBuilder,axios));
