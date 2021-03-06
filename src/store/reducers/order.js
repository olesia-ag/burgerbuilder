import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../../shared/utility'

const initialState = {
	orders: [],
	loading: false,
	purchased: false,
}

const purchaseInit = (state, action) =>{
return updateObject(state, { purchased: false })
	}
	
const purchaseBurgerStart = (state, action) => {
		return updateObject(state, { loading: true })
}

const purchaseBurgerSuccess = (state, action) =>{
	const newOrder = updateObject(action.orderData, {id: action.orderId})
			return updateObject(state, {
				loading: false,
				orders: state.orders.concat(newOrder),
				purchased: true,
			})
}

const purchaseBurgerFailed = (state, action) => {
	return updateObject(state, { loading: false })
}

const fetchOrdersSuccess = (state, action) => {
		return updateObject(state, {
				orders: action.orders,
				loading: false,
			})
}

const fetchOrdersStart = (state, action) => {
	return updateObject(state, { loading: true })
}

const fetchOrdersFailed = (state, action) => {
	return updateObject(state, { loading: false })
}

const deleteOrderStart = (state, action) => {
	return updateObject(state, {loading: true})
}

const deleteOrderSuccess = (state, action) => {
	return updateObject(state, {loading: false, orders: action.orders})
}

const deleteOrderFailed = (state, action) => {
	return updateObject(state, {loading: false, error: action.error})
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
		
		case actionTypes.PURCHASE_BURDER_FAIL: return purchaseBurgerFailed(state, action)
			
		case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action)
		
		case actionTypes.PURCHASE_INIT: return purchaseInit(state, action)
			
		case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action)
	
		case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action)
		
		case actionTypes.FETCH_ORDERS_FAILED: return fetchOrdersFailed(state, action)

		case actionTypes.DELETE_ORDER_START: return deleteOrderStart(state, action)

		case actionTypes.DELETE_ORDER_SUCCESS: return deleteOrderSuccess(state, action)

		case actionTypes.DELETE_ORDER_FAILED: return deleteOrderFailed(state, action)

 		default: return state
	}
}

export default reducer
