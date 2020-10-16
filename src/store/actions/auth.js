import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (idToken, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: idToken,
		userId: userId,
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAILED,
		error: error,
	};
};

export const logout = () => {
	// localStorage.removeItem('token')
	// localStorage.removeItem('expirationTime')
	// localStorage.removeItem('userId')
	return {
		type: actionTypes.AUTH_INITIATE_LOGOUT,
	};
};

export const logoutSucceed = () => {
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const checkAuthTimeout = (expirationTime) => {
	return {
		type: actionTypes.AUTH_CHECK_TIMEOUT,
		expirationTime: expirationTime,
	};
};

export const auth = (email, password, signUp) => {
	return {
		type: actionTypes.AUTH_USER,
		email,
		password,
		signUp,
	};
};

export const setAuthRedirect = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path,
	};
};

export const authCheckState = () => {
	return {
		type: actionTypes.AUTH_CHECK_STATE
	};
};
