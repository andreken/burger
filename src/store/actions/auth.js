import * as actionTypes from './actionTypes'
// import axios from 'axios';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
}

export const authSuccess = (idToken, localId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: idToken,
		userId: localId
	}
}

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	}
}

// Replace with saga, to manage side effects
export const logout = () => {
	// localStorage.removeItem('token');
	// localStorage.removeItem('expirationDate');
	// localStorage.removeItem('userId');
	// return {
	// 	type: actionTypes.AUTH_LOGOUT
	// }
	return {
		type: actionTypes.AUTH_INIT_LOGOUT
	}
}

export const logoutSucceed = () => {
	return {
		type: actionTypes.AUTH_LOGOUT
	}
}

// When token time expires i logout automatically
export const checkAuthTimeout = (expirationTime) => {
	return {
		type: actionTypes.AUTH_CHECK_TIMEOUT,
		expirationTime: expirationTime
	}
}

// mode
// UP: signup (register new user)
// IN: signin (login)
export const auth = (email, password, mode) => {
	// return dispatch => {
	// 	dispatch(authStart());
	// 	const authData = {
	// 		email: email,
	// 		password: password,
	// 		returnSecureToken: true
	// 	}
	// 	const method = mode === 'UP' ? 'signupNewUser' : 'verifyPassword'
	// 	axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/${method}?key=AIzaSyCPPJUVeINZ_cK82p0wszjzwGQStn0_05w`, authData)
	// 		.then(res => {
	// 			// Save user login data on browser
	// 			// To stay loggen also when reloading the page
	// 			const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
	// 			localStorage.setItem('token', res.data.idToken)
	// 			localStorage.setItem('expirationDate', expirationDate)
	// 			localStorage.setItem('userId', res.data.localId)
	// 			dispatch(authSuccess(res.data.idToken, res.data.localId))
	// 			dispatch(checkAuthTimeout(res.data.expiresIn))
	// 		})
	// 		.catch(e => {
	// 			console.log(e);
	// 			dispatch(authFail(e.response.data.error))
	// 		})
	// }
	return {
		type: actionTypes.AUTH_USER,
		email: email,
		password: password,
		mode: mode
	}
}

// path for redirect to burger builder or checkout
export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path
	}
}

// Function used when loading the app, to auto login
export const authCheckState = () => {
	// return dispatch => {
	// 	const token = localStorage.getItem('token');
	// 	if(!token){
	// 		dispatch(logout())
	// 	} else {
	// 		const expirationDate = new Date(localStorage.getItem('expirationDate'));
	// 		if(expirationDate < new Date()){
	// 			dispatch(logout());
	// 		} else {
	// 			const userId = localStorage.getItem('userId');
	// 			const expiresIn = (expirationDate.getTime() - new Date().getTime()) / 1000;
	// 			dispatch(authSuccess(token, userId));
	// 			dispatch(checkAuthTimeout(expiresIn));
	// 		}
	// 	}
	// }
	return {
		type: actionTypes.AUTH_CHECK_STATE
	}
}