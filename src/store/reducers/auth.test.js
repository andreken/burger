import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'
// Here i don't need enzyme because i don't have to render any react component

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	authRedirectPath: '/'
}

describe('auth reducer', () => {
	it('should return initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState)
	})

	it('should store the token upon login', () => {
		expect(reducer(initialState, {
			type: actionTypes.AUTH_SUCCESS,
			token: '123456789',
			userId: '001'
		})).toEqual({
			token: '123456789',
			userId: '001',
			error: null,
			loading: false,
			authRedirectPath: '/'
		})
	})
})
