import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
// Lower case because i'm not going to use it as JSX
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
// Using the configurate instance of axios
import axios from '../../axios-orders'
import * as actions from '../../store/actions/index'

// Use export to use this class into unit tests
// Converted from class to functional component with react hooks
export const burgerBuilder = props => {

	// state = {
	// 	//ingredients: null,
	// 	//totalPrice: 4,
	// 	// UI state
	// 	purchasable: false,
	// 	purchasing: false,
	// }
	const [purchasable, setPurchasable] = useState(false)
	const [purchasing, setPurchasing] = useState(false)

	// Dinamically get ingredients from database
	// Moved to actions
	// componentDidMount() {
	// 	// axios.get('/ingredients.json')
	// 	// 	.then(res => {
	// 	// 		this.setState({ ingredients: res.data })
	// 	// 	})
	// 	// 	.catch(e => {
	// 	// 		this.setState({ error: true })
	// 	// 	})
	// 	this.props.onInitIngredients();
	// }
	// from didMount to hooks
	useEffect(() => {
		props.onInitIngredients();
	}, [])

	const updatePurchaseState = (ingredients) => {
		const sum = Object.values(ingredients)
			.reduce((sum, el) => {
				return sum + el.value;
			},0)
		return sum > 0
	}

	const purchaseHandler = (value) => {
		if(props.isAuthenticated)
			// this.setState({ purchasing: value })
			setPurchasing(value)
		else {
			// After authentication redirect to checkout
			props.onSetAuthRedirectPath('/checkout')
			props.history.push('/auth')
		}
	}

	const purchaseContinueHandler = () => {
		// Going to checkout route and passing ingredients
		// That will be received in the url
		// const queryParams = [];
		// for(let i in this.state.ingredients){
		// 	queryParams.push(encodeURIComponent(i) + '=' +
		// 		encodeURIComponent(this.state.ingredients[i].value) + '#' +
		// 		encodeURIComponent(this.state.ingredients[i].price));
		// }
		// const queryString = queryParams.join('&');
		// this.props.history.push({
		// 	pathname: '/checkout',
		// 	search: '?'+queryString
		// });
		// Using redux i only need to go to checkout path
		// Right before that init purchased to false
		props.onInitPurchase()
		props.history.push('/checkout');
	}


	// Create an object to enable/disable remove btn
	// { salad: true, cheese: false ... }
	const disableBtn = {
		...props.ings
	}
	for(let key in disableBtn){
		disableBtn[key] = disableBtn[key].value <= 0
	}

	let orderSummary = null;

	let burger =  !props.error ? 
		<div style={{textAlign: 'center'}}><Spinner /></div> :
		<div style={{textAlign: 'center'}}><h4>Ingredients can't be loaded</h4></div>

	if(props.ings){
		burger = (
			<React.Fragment>
				<Burger ingredients={props.ings} />
				<BuildControls 
					addIngredient={props.onIngredientAdded} 
					removeIngredient={props.onIngredientRemoved}
					disabled={disableBtn} 
					// Every time i render, calculate purchasable value
					purchasable={updatePurchaseState(props.ings)}
					ordered={() => purchaseHandler(true)}
					isAuth={props.isAuthenticated}
					price={props.price}
				/>
			</React.Fragment>
		);
		orderSummary = (
			<OrderSummary 
				ingredients={props.ings} 
				price={props.price}
				purchaseCanceled={() => purchaseHandler(false)}
				purchaseContinued={purchaseContinueHandler}
			/>
		);
	}

	return (
		<React.Fragment>
			<Modal 
				show={purchasing}
				clicked={() => purchaseHandler(false)} >
				{orderSummary}	
			</Modal>
			{ burger }
		</React.Fragment>
	)
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),	
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));