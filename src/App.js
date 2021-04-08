import React,{Component} from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Checkout from './containers/Chechout/Checkout';
import {Route,Switch,Redirect} from 'react-router-dom';
//import Orders from './containers/Orders/Orders';
//import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as action from './store/actions/index';
import asynComponent from './hoc/asynComponent/asynComponent';


const asynOrderReducer = asynComponent(()=>{
    return import('./containers/Orders/Orders');
});
const asynAuthReducer = asynComponent(()=>{
    return import('./containers/Auth/Auth');
});

const asynCheckoutReducer = asynComponent(()=>{
  return import('./containers/Chechout/Checkout');
});

class App extends Component {
  componentDidMount(){
    this.props.onCheckExpireState()
  }

  render() {
    let router = (
        <Switch>
          <Route path="/Auth" component={asynAuthReducer}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to='/'/>
        </Switch>
        
    );
    if(this.props.isAuthenticated){
    router = (
          <Switch>
            <Route path="/checkout" component={asynCheckoutReducer}/>
            <Route path="/orders" component={asynOrderReducer}/>
            <Route path="/Logout" component={Logout}/>
            <Route path="/Auth" component={asynAuthReducer}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to='/'/>
          </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {router}
        </Layout>
      </div>
    );
  }
}


const mapStateToReducer = state =>{
  return{
    isAuthenticated: state.Auth.token !== null,
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onCheckExpireState: ()=>dispatch(action.authCheckState())
  }
}
export default connect(mapStateToReducer,mapDispatchToProps)(App);
