import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import * as burgerBuildAction from '../../../store/actions/index';
import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import {updataObjected,checkvalidity} from '../../../share/utility';

class ContactData extends Component{
    state = {

        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name',
                },
                value:'',
                validation:{
                    required: true
                },
                valid:false,
                touched:false
            },

            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street',
                },
                value:'',
                validation:{
                    required: true
                },
                valid:false,
                touched:false
            },

            zipCode: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zip Code',
                },
                value:'',
                validation:{
                    required: true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false
            },

            country: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country',
                },
                value:'',
                validation:{
                    required: true
                },
                valid:false,
                touched:false
            },

            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-mail',
                },
                value:'',
                validation:{
                    required: true
                },
                valid:false,
                touched:false
            },
            delivermethod: {
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest', displayValue: 'Fastest'},
                        {value:'Cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value:'',
                valid:true
            },
        },
        formIsValid:false,
        //loading:false
    }
    
    orderHandler =(event)=>{
        event.preventDefault();
        //this.setState({loading:true});
        const formData = {};
        for(let formElmentIdentifier in this.state.orderForm){
            formData[formElmentIdentifier] = this.state.orderForm[formElmentIdentifier];
        }
        const order = {
            ingredients: this.props.Ingrs,
            price: this.props.price,
            orderData:formData,
            userId: this.props.userId
        }
        axios.post('/orders.json',order)
            .then(response=>{
                this.setState({loading:false});
                this.props.history.push('/');
            })
            .catch(error=> {
                this.setState({loading:false});
            });
        
        this.props.onBurgerOrder(order,this.props.token);
    }


    
    inputChangedHandler = (event,inputIdentifier)=>{

    const updateFormElement = updataObjected(this.state.orderForm[inputIdentifier],{
        value:event.target.value,
        valid:checkvalidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
        touched:true
    });

    const updatedOrderForm = updataObjected(this.state.orderForm,{
        [inputIdentifier]:updateFormElement
    });

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm:updatedOrderForm, formIsValid:formIsValid})
    }

    render(){
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(forElement=>(
                    <Input 
                        key={forElement.id}
                        elementType={forElement.config.elementType}
                        elementConfig={forElement.config.elementConfig}
                        value={forElement.config.value}
                        changed={(event)=>this.inputChangedHandler(event,forElement.id)}
                        invalid={!forElement.config.valid}
                        shouldValidate={forElement.config.validation}
                        touched = {forElement.config.touched}
                    />
                ))}
                <Button btnType="Success" disabled = {!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if(this.props.loading){
            form = <Spinner/>
        }

        return(
            <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
        );
}
}

const mapStateToReducer = state =>{
    return{
        Ingrs: state.bugerBuider.ingredients,
        price: state.bugerBuider.totalPrice,
        loading: state.order.loading,
        token: state.Auth.token,
        userId: state.Auth.userId
    }
}

const mapDispatchToReducer = dispatch =>{
    return{
        onBurgerOrder: (orderData,token)=>dispatch(burgerBuildAction.burgerOrder(orderData,token)),
    }
    
}
export default connect(mapStateToReducer,mapDispatchToReducer)(WithErrorHandler(ContactData,axios));