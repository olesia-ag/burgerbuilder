import React from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 1.5,
	meat: 3,
	bacon: 2,
}

class BurgerBuilder extends React.Component {
	constructor() {
		super()
		this.state = {
			ingredients: {
				salad: 0,
				bacon: 0,
				cheese: 0,
				meat: 0,
			},
			totalPrice: 4,
		}
	}
	addIngredientHandler = (type) => {
		//accessing the value of the key 'type', which is the number:
		const oldCount = this.state.ingredients[type]
		const updatedCount = oldCount + 1
		const updatedIngredients = {
			...this.state.ingredients,
		}
		updatedIngredients[type] = updatedCount
		const priceAddition = INGREDIENT_PRICES[type]
		const oldPrice = this.state.totalPrice
		const newPrice = oldPrice + priceAddition
		this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type]
		if (oldCount <= 0) {
			return
		}
		const updatedCount = oldCount - 1
		const updatedIngredients = {
			...this.state.ingredients,
		}
		updatedIngredients[type] = updatedCount
		const priceDeduction = INGREDIENT_PRICES[type]
		const oldPrice = this.state.totalPrice
		const newPrice = oldPrice - priceDeduction
		this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients,
        }
        //change quantity numbers to true or false: 
		for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
		}

		return (
			<Aux>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    price={this.state.totalPrice}
				/>
			</Aux>
		)
	}
}

export default BurgerBuilder
