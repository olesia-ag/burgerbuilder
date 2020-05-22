import React from 'react'
import original from '../assests/images/original.png'
import classes from './Logo.module.css'


const logo = (props) => (
	<div className={classes.Logo} style={{height: props.height}}>
		<img src={original} alt="MY BURGER"/>
	</div>
)

export default logo
