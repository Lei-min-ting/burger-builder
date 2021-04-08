import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import {connect} from 'react-redux';
import * as burgerBuildAction from '../../store/actions/index';

class Orders extends Component{
    
    componentDidMount(){
        this.props.onOrderFetch(this.props.token,this.props.userId)
    }

    render(){
        return(
            <div>
                {this.props.orders.map(order=>(
                    <Order 
                    ingredients={order.ingredients}
                    key={order.id}
                    price={order.price}/>
                ))}
            </div>
        );
    }
}

const mapStateToReducer = state =>{
    return{
        Ingrs: state.bugerBuider.ingredients,
        price: state.bugerBuider.totalPrice,
        loading: state.order.loading,
        orders: state.order.orders,
        token:state.Auth.token,
        userId: state.Auth.userId
    }
}

const mapDispatchToReducer = dispatch =>{
    return{
        onOrderFetch: (token,userId)=>dispatch(burgerBuildAction.fetchOrder(token,userId)),
    }
    
}

export default connect (mapStateToReducer,mapDispatchToReducer)(withErrorHandler(Orders,axios));

