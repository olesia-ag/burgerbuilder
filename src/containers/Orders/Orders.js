import React from 'react'
import Order from '../../components/Order/Order'
import axiosIns from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'
import Button from '../../components/UI/Button/Button'
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
		if(!this.props.loading && this.props.orders.length!==0){
			orders = this.props.orders.map((order) => (
				<div>
					<Order
						key={order.id}
						id={order.id}
						ingredients={order.ingredients}
						price={order.price}
						delete={()=>this.props.onDeleteOrder(order.id, this.props.token, this.props.orders)}
					/>
				</div>
				
				))
			
		}
		if(!this.props.loading && this.props.orders.length===0){
			orders = <p>Seems like you don't have any orders here!</p>
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
		onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
		onDeleteOrder: (orderId, token, orders) => dispatch(actions.deleteOrder(orderId, token, orders)) 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosIns))
