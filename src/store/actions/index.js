// Group all my exports into one single file
export {
	addIngredient,
	removeIngredient,
	initIngredients,
	// used by redux saga
	setIngredients,
	fetchIngredientsFailed
} from './burgerBuilder'

export {
	purchaseBurger,
	purchaseInit,
	fetchOrders,
	// used by redux saga
	purchaseBurgerStart,
	purchaseBurgerSuccess,
	purchaseBurgerFail,
	fetchOrdersStart,
	fetchOrdersSuccess,
	fetchOrdersFail	
} from './order'

export {
	auth,
	logout,
	logoutSucceed,
	setAuthRedirectPath,
	authCheckState,
	// used by redux saga
	authStart,
	authSuccess,
	authFail,
	checkAuthTimeout
} from './auth'