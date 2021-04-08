import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import {connect} from 'react-redux';
import * as action from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {updataObjected,checkvalidity} from '../../share/utility';

class Auth extends Component {
    state = {
        controls: {
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Mail Address',
                },
                value:'',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'password',
                },
                value:'',
                validation:{
                    required: true,
                    minLength: 6
                },
                valid:false,
                touched:false
            }
            
        },
        isSignup: true
    }
    componentDidMount(){
        if(!this.props.building && this.props.authRedirectPath !== '/'){
            this.onSetAuthRedireactPath;
        }
    }

    inputChangedHandler = (event,controlName) =>{
        const controlsName = updataObjected(this.state.controls[controlName],{
            value:event.target.value,
            valid:checkvalidity(event.target.value,this.state.controls[controlName].validation),
            touched:true
        });
        const updataControls = updataObjected(this.state.controls,{
            [controlName]:controlsName
        });
        this.setState({controls:updataControls})

       /* const updataControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:this.checkvalidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            }
        }
        this.setState({controls:updataControls});*/
    }

    onSumbitHandler = (event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
    }

    SignSwitchHandler = () =>{
        this.setState(prevState=>{
            return {isSignup: !prevState.isSignup}
        })
    }

    render(){
        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }

        let form = formElementsArray.map(forElement=>(
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
                )
        );
        
        if (this.props.loading){
            form = <Spinner/>
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }
        let Authenticaated = null;
        if(this.props.isAuthticated){
            Authenticaated = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={classes.Auth}>
                {Authenticaated}
                <form onSubmit={this.onSumbitHandler}>
                    {form}
                    <Button btnType="Success" >SUBMIT</Button>
                </form>
                <Button
                clicked={this.SignSwitchHandler} 
                btnType="Danger" >SWITCH TO {this.state.isSignup ? 'SINGNIN':'SINGNUP'}</Button>
                {errorMessage}
            </div>
        );
    }
}

const mapStateToReducer = state =>{
    return {
        loading:state.Auth.loading,
        error: state.Auth.error,
        isAuthticated: state.Auth.token !== null,
        building: state.bugerBuider.building,
        authRedirectPath: state.Auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onAuth: (email,password,isSignup)=>dispatch(action.Auth(email,password,isSignup)),
        onSetAuthRedireactPath: ()=>dispatch(action.setAuthRedirect('/'))
    }
    
}

export default connect(mapStateToReducer,mapDispatchToProps)(Auth);