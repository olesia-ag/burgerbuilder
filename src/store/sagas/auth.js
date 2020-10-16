import { put, delay, call } from 'redux-saga/effects';
import * as actions from '../actions';
import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

//*turns the function into generator, they can be paused
//yield will let async
export function* logoutSaga(action) {
	yield call([localStorage, 'removeItem'], 'token');
	// yield localStorage.removeItem('token');
	yield call([localStorage, 'removeItem'], 'expirationTime');
	// yield localStorage.removeItem('expirationTime');
	yield call([localStorage, 'removeItem'], 'userId');
	// yield localStorage.removeItem('userId');
	yield put(actions.logoutSucceed);
}

export function* checkAuthTimeoutSaga(action) {
	yield delay(action.expirationTime * 1000);
	yield put(actions.logout());
}

export function* authUserSaga(action) {
	yield put(actions.authStart);
	const authData = {
		email: action.email,
		password: action.password,
		returnSecureToken: true,
	};
	let url =
		'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCZaOBqHjxqH0uP-H-s-uvCiWi4CJHPXIE';
	if (!action.isSignup) {
		url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCZaOBqHjxqH0uP-H-s-uvCiWi4CJHPXIE';
	}

	try {
		const res = yield axios.post(url, authData);
		//from current time + time the token will be valid for
		//gteTime return the number of milliseconds
		//so it's today's date in milliseconds plus time it will epire in
		const expDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
		yield localStorage.setItem('token', res.data.idToken);
		yield localStorage.setItem('expirationTime', expDate);
		yield localStorage.setItem('userId', res.data.localId);
		yield put(actions.authSuccess(res.data.idToken, res.data.localId));
		yield actions.checkAuthTimeout(res.data.expiresIn);
	} catch (err) {
		yield put(actions.authFail(err.response.data.error));
	}
}

export function* authCheckStateSaga(action) {
	const token = yield localStorage.getItem('token');
	if (!token) {
		yield put(actions.logout());
	} else {
		//exp time from local storage will be a string, so we need date constructor again to make it a date
		const expirationTime = yield new Date(
			localStorage.getItem('expirationTime')
		);
		if (expirationTime <= new Date()) {
			yield put(actions.logout());
		} else {
			const userId = yield localStorage.getItem('userId');
			yield put(actions.authSuccess(token, userId));
			yield put(
				actions.checkAuthTimeout(
					(expirationTime.getTime() - new Date().getTime()) / 1000
				)
			);
		}
	}
}
