import axiosIns from '../../axios-orders';
import { put, delay } from 'redux-saga/effects';
import * as actions from '../actions';

export function* initIngredientsSaga() {
	try {
		const response = yield axiosIns.get('/ingredients.json');
		yield put(actions.setIngredients(response.data));
	} catch (err) {
		yield put(actions.fetchIngredientsFailed());
	}
}
