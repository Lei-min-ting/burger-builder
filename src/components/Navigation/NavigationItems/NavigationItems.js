import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props)=>(
    <ul className = {classes.NavigationItems}> 
        <NavigationItem link = "/" exact >Burger Builder</NavigationItem>
        {props.isAutenticated ? <NavigationItem link = "/orders" >Orders</NavigationItem>:null }
        {!props.isAutenticated 
        ? <NavigationItem link = "/Auth" >Authentication</NavigationItem>
        : <NavigationItem link = "/Logout" >Logout</NavigationItem>}
              
    </ul>
)

export default navigationItems;
