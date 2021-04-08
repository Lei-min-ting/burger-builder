import React,{Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component{
    state = {
        showSideDrawer: true
    }

    sideDrawerCloseHandler = () =>{
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = ()=>{
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render(){
        return(
            <Auxiliary>
                <Toolbar
                isAuth = {this.props.isAuthenticated} 
                drawerToggleClicked = {this.sideDrawerToggleHandler}/>
                <SideDrawer
                isAuth = {this.props.isAuthenticated} 
                open = {this.state.showSideDrawer} 
                closed ={this.sideDrawerCloseHandler} />
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

const mapStateToReducer = state =>{
    return {
        isAuthenticated : state.Auth.token !== null
    }
}

export default connect(mapStateToReducer)(Layout);
