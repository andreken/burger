import {put} from 'redux-saga/effects'
// Using the configurate instance of axios
import axios from '../../axios-orders'
import * as actions from '../actions/index'

export function* initIngredientsSaga(action){
	try {
		const res = yield axios.get('/ingredients.json');
		yield put(actions.setIngredients(res.data));
	} catch(e) {
		yield put(actions.fetchIngredientsFailed());
	}
}