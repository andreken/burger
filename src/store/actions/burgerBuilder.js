// Action creator types
import * as actionTypes from './actionTypes'
// Using the configurate instance of axios
import axios from '../../axios-orders'

export const addIngredient = (ingName) => {
	return { 
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: ingName
	}
}

export const removeIngredient = (ingName) => {
	return { 
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: ingName
	}
}

export const setIngredients = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients
	}
}

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED,
	}
}

export const initIngredients = () => {
	// return dispatch => {
	// 	axios.get('/ingredients.json')
	// 		.then(res => {
	// 			dispatch(setIngredients(res.data));
	// 		})
	// 		.catch(e => {
	// 			dispatch(fetchIngredientsFailed());
	// 		})
	// }
	return {
		type: actionTypes.INIT_INGREDIENTS
	}
}