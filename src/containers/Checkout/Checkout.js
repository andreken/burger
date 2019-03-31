import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

// Converted from class to functional component with react hooks
const checkout = props => {

	// state = {
	// 	ingredients: null
	// }

	// Evaluate state in willMount because i need ingredients
	// before the component is rendered
	// because are passed to CheckoutSummary component
	// Load ingredients using query param
	// Using '+' on price and value to convert into a number
	// componentWillMount() {
		// No more needed, added redux to manage state
		// const query = new URLSearchParams(this.props.location.search);
		// const ingredients = {};
		// let price, value;
		// for(let param of query.entries()) {
		// 	[value,price] = param[1].split('#')
		// 	ingredients[param[0]] = {price: +price, value: +value}
		// }
		// this.setState({
		// 	ingredients: ingredients
		// })
	// }

	const checkoutCancelledHandler = () => {
		props.history.goBack();
	}

	// Using replace instead of push
	// so that when going back from /checkout/contact-data
	// i will return on main page instead of /checkout
	const checkoutContinuedHandler = () => {
		props.history.replace('/checkout/contact-data')
	}


	// if no ingredients are added, return to the main page
	let summary = <Redirect to ="/" />
	if(props.ings){
		summary = (
			<CheckoutSummary 
				ingredients={props.ings} 
				checkoutCancelled={checkoutCancelledHandler}
				checkoutContinued={checkoutContinuedHandler}
			/>
		)
	}
	return (
		<div>
			{ summary }
		{ /* If order completed i leave the page */ }
			{ props.purchased ? <Redirect to ="/" /> : null }
		{/* Here i want to pass ingredients to the ContactData 
				To do so, i pass it in render with props
				instead of using component keywork 
				I also pass all props received by Checkout
				to have access to the history prop into ContactData */}
			<Route 
				path={props.match.path + '/contact-data'} 
				component={ContactData}
				// No more needed, added redux to manage state
				// render={(props) => ( <ContactData ingredients={this.props.ingredients} {...props} /> )}
			/>
		</div>
	)
}


const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.orders.purchased
	}
}

export default connect(mapStateToProps)(checkout);