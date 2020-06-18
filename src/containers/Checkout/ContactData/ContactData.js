import React from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axiosIns from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as orderActions from '../../../store/actions/index'

class ContactData extends React.Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip Code',
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
				},
				valid: false,
				touched: false,
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your email',
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false,
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' },
					],
				},
				value: 'fastest',
				validation: {},
				valid: true,
			},
		},
		formIsValid: false
	}

	orderHandler = (event) => {
		event.preventDefault()
		const formData = {}
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[
				formElementIdentifier
			].value
		}
		const order = {
			ingredients: this.props.ings,
			//in production price shoulb be calculate on the server to make sure that user doesn't manipulate it
			price: this.props.totPr,
			deliveryMethod: 'fastest',
			orderData: formData,
		}
		this.props.onOrder(order)
	}

	checkValidity(value, rules) {
		let isValid = true
		if (!rules) {
			return true
		}
		if (rules.required) {
			isValid = value.trim() !== '' && isValid
		}
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid
		}
		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid
		}
		if(rules.numeric){
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        if(rules.isEmail){
            const pattern = /^[a-zA-Z0-9][a-zA-Z0-9-_\.]+@([a-zA-Z]|[a-zA-Z0-9]?[a-zA-Z0-9-]+[a-zA-Z0-9])\.[a-zA-Z0-9]{2,10}(?:\.[a-zA-Z]{2,10})?$/
            isValid = pattern.test(value) && isValid
        }
		return isValid
	}

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm,
		}
		const updatedFormElement = { ...updatedOrderForm[inputIdentifier] }
		updatedFormElement.value = event.target.value
		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		)
		updatedFormElement.touched = true
		updatedOrderForm[inputIdentifier] = updatedFormElement
		let formIsValid = true
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
		}
		console.log('is it valid!', formIsValid)
		this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
	}
	render() {
		const formElementsArray = []
		for (let key in this.state.orderForm) {
			formElementsArray.push({ id: key, config: this.state.orderForm[key] })
		}
		let form = (
			<form onsubmit={this.orderHandler}>
				{formElementsArray.map((formElement) => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						changed={(event) => this.inputChangedHandler(event, formElement.id)}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
					/>
				))}

				<Button
					btnType='Success'
					disabled={!this.state.formIsValid}
					clicked={this.orderHandler}
				>
					ORDER
				</Button>
			</form>
		)
		if (this.props.loading) {
			form = <Spinner />
		}
		return (
			<div className={classes.ContactData}>
				<h4>enter you contact information:</h4>
				{form}
			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		totPr: state.burgerBuilder.totalPrice,
		loading: state.order.loading
	}
}
const mapDispatchToProps = dispatch => {
	return {
		onOrder: (orderData)=> dispatch(orderActions.purchaseBurger(orderData))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axiosIns))
