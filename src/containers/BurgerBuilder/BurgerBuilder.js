import React from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axiosIns from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'

class BurgerBuilder extends React.Component {
	constructor() {
		super()
		this.state = {
			purchasing: false,
		}
	}
	componentDidMount() {
		console.log('burger builder props', this.props)
		this.props.onInitIngredients()	
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey]
			})
			.reduce((sum, el) => {
				return sum + el
			}, 0)
		return sum > 0
	}

	// addIngredientHandler = (type) => {
	// 	//accessing the value of the key 'type', which is the number:
	// 	const oldCount = this.state.ingredients[type]
	// 	const updatedCount = oldCount + 1
	// 	const updatedIngredients = {
	// 		...this.state.ingredients,
	// 	}
	// 	updatedIngredients[type] = updatedCount
	// 	const priceAddition = INGREDIENT_PRICES[type]
	// 	const oldPrice = this.state.totalPrice
	// 	const newPrice = oldPrice + priceAddition
	// 	this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })
	// 	this.updatePurchaseState(updatedIngredients)
	// }

	// removeIngredientHandler = (type) => {
	// 	const oldCount = this.state.ingredients[type]
	// 	if (oldCount <= 0) {
	// 		return
	// 	}
	// 	const updatedCount = oldCount - 1
	// 	const updatedIngredients = {
	// 		...this.state.ingredients,
	// 	}
	// 	updatedIngredients[type] = updatedCount
	// 	const priceDeduction = INGREDIENT_PRICES[type]
	// 	const oldPrice = this.state.totalPrice
	// 	const newPrice = oldPrice - priceDeduction
	// 	this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })
	// 	this.updatePurchaseState(updatedIngredients)
	// }

	purchaseHandler = () => {
		if(this.props.isAuthenticated) {
			this.setState({ purchasing: true })
		} else{
			this.props.onSetAuthRedirectPath('/checkout')
			this.props.history.push('/auth')
		}
		
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false })
	}
	purchaseContinueHandler = () => {
		this.props.onInitPurchase()
		this.props.history.push({
			pathname: '/checkout',
		})
	}
	render() {
		const disabledInfo = {
			...this.props.ings,
		}
		//change quantity numbers to true or false:
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
			// console.log(`**** ${key}`, disabledInfo[key])
		}
		let orderSummary = null

		let burger = this.props.error ? (
			<p style={{ textAlign: 'center' }}>ingredients can not be loaded</p>
		) : (
			<Spinner />
		)
		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						price={this.props.totPr}
						purchasable={this.updatePurchaseState(this.props.ings)}
						ordered={this.purchaseHandler}
						isAuth={this.props.isAuthenticated}
					/>
				</Aux>
			)
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					cancel={this.purchaseCancelHandler}
					purchaseCanceled={this.purchaseCancelHandler}
					purchaseContinue={this.purchaseContinueHandler}
					price={this.props.totPr}
				/>
			)
		}
	
		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		totPr: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated : !!state.auth.idToken
		
	}
}
const mapDispatchToprops = (dispatch) => {
	return {
		onIngredientAdded: (ingredientName) =>
			dispatch(actions.addIngredient(ingredientName)),
		onIngredientRemoved: (ingredientName) =>
			dispatch(actions.removeIngredient(ingredientName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase : () => dispatch(actions.purchaseInit())	,
		onSetAuthRedirectPath: (path)=> dispatch(actions.setAuthRedirect(path))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToprops
)(withErrorHandler(BurgerBuilder, axiosIns))
