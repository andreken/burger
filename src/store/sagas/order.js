import {put} from 'redux-saga/effects'
// Using the configurate instance of axios
import axios from '../../axios-orders'
import * as actions from '../actions/index'

export function* purchaseBurgerSaga(action){
	yield put(actions.purchaseBurgerStart());
	try {
		const response = yield axios.post('/orders.json?auth='+action.token, action.orderData)
		yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
	} catch(error) {
		yield put(actions.purchaseBurgerFail(error))
	}
}

export function* fetchOrdersSaga(action){
	yield put(actions.fetchOrdersStart());
	// get orders passing auth token of logged user
	// also pass the userId to get only orders of current user
	// equalTo refers to orderBy param
	// NB: with firebase also add rule for userId to enable it as index
	const queryParams = '?auth='+action.token+'&orderBy="userId"&equalTo="'+action.userId+'"'
	try{
		const res = yield axios.get('/orders.json'+queryParams)
		// Turns order obj into an array
		// distribute values to add id
		const arrayOrders = [];
		for(let key in res.data){
			arrayOrders.push({ 
				...res.data[key],
				id: key
			});
		}
		yield put(actions.fetchOrdersSuccess(arrayOrders))
	} catch (err) {
		yield put(actions.fetchOrdersFail(err))
	}
}