// Action creator types
import * as actionTypes from './actionTypes'
// Using the configurate instance of axios
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	}
}

export const purchaseBurgerFail = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error
	}
}

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	}
}

// action dispatched once we click order button
// Moved on saga
export const purchaseBurger = (orderData, token) => {
	return {
		type: actionTypes.PURCHASE_BURGER,
		orderData: orderData,
		token: token
	}
}

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	}
}

export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	}
}

export const fetchOrdersFail = (error) => {
	return {	
		type: actionTypes.FETCH_ORDERS_FAIL,
		error: error
	}
}

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	}
}

// Moved on saga
export const fetchOrders = (token,userId) => {
	// return dispatch => {
	// 	dispatch(fetchOrdersStart())
	// 	// get orders passing auth token of logged user
	// 	// also pass the userId to get only orders of current user
	// 	// equalTo refers to orderBy param
	// 	// NB: with firebase also add rule for userId to enable it as index
	// 	const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"'
	// 	axios.get('/orders.json'+queryParams)
	// 		.then(res => {
	// 			// Turns order obj into an array
	// 			// distribute values to add id
	// 			const arrayOrders = [];
	// 			for(let key in res.data){
	// 				arrayOrders.push({ 
	// 					...res.data[key],
	// 					id: key
	// 				});
	// 			}
	// 			dispatch(fetchOrdersSuccess(arrayOrders))
	// 		})
	// 		.catch(err => {
	// 			dispatch(fetchOrdersFail(err))
	// 		})
	// }
	return {
		type: actionTypes.FETCH_ORDERS,
		token: token,
		userId: userId
	}
}

