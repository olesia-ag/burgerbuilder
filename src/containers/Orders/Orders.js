import React from 'react'
import Order from '../../components/Order/Order'
import axiosIns from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'

class Orders extends React.Component {
	state = {
		orders: [],
		loading: true,
	}

	componentDidMount(){
		console.log("*******, userId",  this.props.userId)
		this.props.onFetchOrders(this.props.token, this.props.userId)
	}

	render() {
		let orders = <Spinner />
		if(!this.props.loading){
			orders = this.props.orders.map((order) => (
					<Order
						key={order.id}
						ingredients={order.ingredients}
						price={order.price}
					/>
				))
			
		}
		return (
			<div>
				{orders}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.idToken,
		userId: state.auth.userId
	}
}
const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)) 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosIns))
