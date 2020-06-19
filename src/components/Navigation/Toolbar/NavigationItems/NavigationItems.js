import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link='/' exact>
			Burger Builer
		</NavigationItem>
		<NavigationItem link='/orders'>Orders</NavigationItem>
		{props.isAuthenticated ? (
			<NavigationItem link='/logout'>Logout</NavigationItem>
		) : (
			<NavigationItem link='/auth'>Authenticate</NavigationItem>
		)}
	</ul>
)

export default navigationItems
