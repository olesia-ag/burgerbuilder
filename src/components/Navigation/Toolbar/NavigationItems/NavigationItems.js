import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = () =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>
            Burger Builer
        </NavigationItem>
        <NavigationItem>
            Checkout
        </NavigationItem>
    </ul>
)

export default navigationItems