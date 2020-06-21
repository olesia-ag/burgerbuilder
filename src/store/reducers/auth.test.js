import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'

describe('auth reducer', () => {
	let initialState = {
		idToken: null,
		userId: null,
		error: null,
		loading: false,
		authRedirectPath: '/',
	}
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState)
	})
	it('should store the token upon login', () => {
		expect(
			reducer(
				{
					idToken: null,
					userId: null,
					error: null,
					loading: false,
					authRedirectPath: '/',
				},
				{
					type: actionTypes.AUTH_SUCCESS,
					idToken: 'some_token',
					userId: 'some-userId',
				}
			)
		).toEqual({
			idToken: 'some_token',
			userId: 'some-userId',
			error: null,
			loading: false,
			authRedirectPath: '/',
		})
	})
})
