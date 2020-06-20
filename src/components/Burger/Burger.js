import React from 'react'
import { withRouter } from 'react-router-dom'
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
	let trasformedingredients = Object.keys(props.ingredients)
		.map((igKey) => {
			return [...Array(props.ingredients[igKey])].map((_, i) => {
				return <BurgerIngredient key={igKey + i} type={igKey} />
			})
		})
		.reduce((arr, el) => {
			return arr.concat(el)
		}, [])

	if (trasformedingredients.length === 0) {
		trasformedingredients = <p>Please strart adding ingredients</p>
	}
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type='bread-top' />
			{trasformedingredients}
			<BurgerIngredient type='bread-bottom' />
		</div>
	)
}

export default withRouter(burger)
