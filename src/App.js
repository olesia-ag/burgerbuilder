import React from 'react'
import './App.css'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import { Route, withRouter } from 'react-router-dom'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'

class App extends React.Component {
	componentDidMount() {
		this.props.onTryAutoSignIn()
	}
	render() {
		return (
			<div>
				<Layout>
					<Route path='/checkout' component={Checkout} />
					<Route path='/orders' component={Orders} />
					<Route path='/auth' component={Auth} />
					<Route path='/logout' component={Logout} />
					<Route path='/' exact component={BurgerBuilder} />
				</Layout>
			</div>
		)
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignIn: () => dispatch(actions.authCheckState()),
	}
}
export default withRouter(connect(null, mapDispatchToProps)(App))
