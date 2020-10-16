import { put, delay } from 'redux-saga/effects';
import * as actions from '../actions';
import * as actionTypes from '../actions/actionTypes';
import axiosIns from '../../axios-orders';

export function* purchaseBurgerSaga(action) {
	yield put(actions.purchaseBurgerStart());
	try {
		const res = yield axiosIns.post(
			`/orders.json?auth=${action.token}`,
			action.orderData
		);
		yield put(actions.purchaseBurgerSuccess(res.data.name, action.orderData));
	} catch (err) {
		yield put(actions.purchaseBurgerFail(err));
	}
}

export function* fetchOrdersSaga(action) {
	yield put(actions.fetchOrdersStart());
	const queryParams = `${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
	try {
		const res = yield axiosIns.get('/orders.json?auth=' + queryParams);
		const fetchedOrders = [];
		for (let key in res.data) {
			fetchedOrders.push({ ...res.data[key], id: key });
		}
		yield put(actions.fetchOrdersSuccess(fetchedOrders));
	} catch (error) {
		yield put(actions.fetchOrdersFail(error));
	}
}
