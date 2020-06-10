import React from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axiosIns from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends React.Component {
	state = {
		name: '',
		email: '',
		addres: {
			street: '',
			postalCode: '',
		},
		loading: false,
	}

	orderHandler = (event) => {
		event.preventDefault()
		console.log('ord', this.props.ingredients)
		this.setState({ loading: true })
		const order = {
			ingredients: this.props.ingredients,
			//in production price shoulb be calculate on the server to make sure that user doesn't manipulate it
			price: this.props.totalPrice,
			deliveryMethod: 'fastest',
		}
        //.json for firebase endpoint specifically!!!
        console.log('order final:', order)
		axiosIns
			.post('/orders.json', order)
            .then((res) => {
            this.setState({ loading: false })
            this.props.history.push('/')
            })
			.catch((err) => this.setState({ loading: false }))
	}

	render() {
		let form = (
			<form>
				<input
					className={classes.Input}
					type='text'
					name='name'
					placeholder='your name'
				/>
				<input
					className={classes.Input}
					type='email'
					name='email'
					placeholder='your email'
				/>
				<input
					className={classes.Input}
					type='text'
					name='street'
					placeholder='your street'
				/>
				<input
					className={classes.Input}
					type='text'
					name='postal'
					placeholder='your code'
				/>
				<Button btnType='Success' clicked={this.orderHandler}>
					ORDER
				</Button>
			</form>
		)
		if (this.state.loading) {
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

export default ContactData
