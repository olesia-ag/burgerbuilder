import * as actionTypes from './actionTypes'
import axiosIns from '../../axios-orders'


export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderID: id,
		orderData: orderData,
	}
}

export const purchaseBurgerFail = (error) => {
	return {
		type: actionTypes.PURCHASE_BURDER_FAIL,
		error: error,
	}
}

export const purchaseBurger = (orderData, token) => {
	return {
		type: actionTypes.PURCHASE_BURGER,
		orderData: orderData,
		token: token
	}
}

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START,
	}
}

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT,
	}
}

export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders,
	}
}

export const fetchOrdersFail = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAILED,
		error: error,
	}
}

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START,
	}
}

export const fetchOrders = (token, userId) => {
	return {
		type: actionTypes.FETCH_ORDERS,
		token: token,
		userID: userId
	}

}

export const deleteOrderStart = () => {
	return {
		type: actionTypes.DELETE_ORDER_START,
	}
}

export const deleteOrderSuccess = (orders) => {
	return {
		type: actionTypes.DELETE_ORDER_SUCCESS,
		orders: orders,
	}
}

export const deleteOrder = (orderId, token, orders) => {
	return (dispatch) => {
		dispatch(deleteOrderStart())
		axiosIns
			.delete('/orders/' + orderId + '.json?auth=' + token)
			.then((res) => {
				if(res.status === 200){
					let newOrders = orders.filter(order=> order.id !== orderId)
					dispatch(deleteOrderSuccess(newOrders))
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}
}


export const deleteOrderFailed = (error) => {
	return {
		type: actionTypes.DELETE_ORDER_FAILED,
		error: error
	}
}
