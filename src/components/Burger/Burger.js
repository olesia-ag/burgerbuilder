import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {

    let trasformedingredients = Object.keys(props.ingredients)
        .map(igKey => {
            // console.log('igKey:', igKey)
            // console.log('props ingrrediets:', props.ingredients)
            // console.log('props.ingredients[igKey]:',props.ingredients[igKey])
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                // console.log(i)
            return <BurgerIngredient key={igKey +i} type={igKey} />
            }
            )
        })
        .reduce((arr, el) => {
            return arr.concat(el)}, [])

    if(trasformedingredients.length===0) {
       trasformedingredients=<p>Please strart adding ingredients</p>  
    }   
	return (
    <div className={classes.Burger}>
        <BurgerIngredient type='bread-top' />
       {trasformedingredients}
        <BurgerIngredient type='bread-bottom' />
    </div>
    )
}

export default burger
