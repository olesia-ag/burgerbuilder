import React from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'
import { updateObject } from '../../shared/utility'
import {checkValidity} from '../../shared/utility'

class Auth extends React.Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'your email address',
				},
				value: '',
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false,
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'password',
				},
				value: '',
				validation: {
					required: true,
					minLength: 6,
				},
				valid: false,
				touched: false,
			},
		},
		isSignup: true,
	}
	//so that we don't go go to checkout if we're not building a burger:
	componentDidMount() {
		if (!this.props.building && this.props.authRedirectPath !== '/') {
			this.props.onSetAuthRedirectPath()
		}
	}



	inputChangedHandler = (event, controlName) => {
		const updateControls = updateObject(this.state.controls, {
			[controlName]: updateObject(this.state.controls[controlName], {
				value: event.target.value,
				valid: checkValidity(
					event.target.value,
					this.state.controls[controlName].validation
				),
				touched: true,
			}),
		})

		this.setState({ controls: updateControls })
	}
	submitHandler = (event) => {
		event.preventDefault()
		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.isSignup
		)
	}
	swithAuthModeHandler = () => {
		this.setState((prevState) => {
			return {
				isSignup: !prevState.isSignup,
			}
		})
	}
	render() {
		const formElementsArray = []
		for (let key in this.state.controls) {
			formElementsArray.push({ id: key, config: this.state.controls[key] })
		}
		let form = formElementsArray.map((formElement) => (
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
		))

		if (this.props.loading) {
			form = <Spinner />
		}
		let errorMessage = null

		if (this.props.error) {
			errorMessage = <p>{this.props.error.message}</p>
		}
		let authRedirect = null
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirect} />
		}
		return (
			<div className={classes.Auth}>
				{authRedirect}
				{errorMessage}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType='Success'>SUBMIT</Button>
				</form>
				<Button btnType='Danger' clicked={this.swithAuthModeHandler}>
					SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}
				</Button>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: !!state.auth.idToken,
		building: state.burgerBuilder.building,
		authRedirect: state.auth.authRedirectPath,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, isSignup) =>
			dispatch(actions.auth(email, password, isSignup)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirect('/')),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
