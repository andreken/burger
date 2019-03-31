import * as actionTypes from '../actions/actionTypes.js';
import { updateObject } from '../../shared/utility';

const initialState = {
	// ingredients: {
	// 	bacon: { price: 0.7, value: 0 },
	// 	cheese: { price: 0.4, value: 0 },
	// 	meat: { price: 3, value: 0 },
	// 	salad: { price: 0.5, value: 0 }
	// },
	ingredients: null,
	totalPrice: 4,
	error: false,
	// True if i'm making a burger
	building: false
}

const addIngredient = (state, action) => {
	// deep copy objects
	const newIngs = JSON.parse(JSON.stringify(state.ingredients));
	newIngs[action.ingredientName].value++;
	const updateState = {
		ingredients: newIngs,
		totalPrice: state.totalPrice + newIngs[action.ingredientName].price,
		building: true
	}
	return updateObject(state, updateState);
}

const removeIngredient = (state, action) => {
	// deep copy objects
	const newIngs = JSON.parse(JSON.stringify(state.ingredients));
	newIngs[action.ingredientName].value--;
	const updateState = {
		ingredients: newIngs,
		totalPrice: state.totalPrice - newIngs[action.ingredientName].price,
		building: true
	}
	return updateObject(state, updateState);
}

const setIngredient = (state, action) => {
	return updateObject(state, {
		ingredients: action.ingredients,
		error: false,
		totalPrice: 4,
		building: false
	})
}

const fetchIngredientsFailed = (state, action) => {
	return updateObject(state, {
		error: true
	})
}

const reducer = (state = initialState, action) => {
	// deep copy objects
	const newIngs = JSON.parse(JSON.stringify(state.ingredients));
	switch(action.type){
		case actionTypes.ADD_INGREDIENT:
			return addIngredient(state, action);
		case actionTypes.REMOVE_INGREDIENT:
			return removeIngredient(state, action);
		case actionTypes.SET_INGREDIENTS:
			return setIngredient(state, action);
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return fetchIngredientsFailed(state, action);
		default:
			return state;
	}
}

export default reducer;