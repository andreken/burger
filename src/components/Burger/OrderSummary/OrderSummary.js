import React from 'react'
// import classes from './Modal.module.css'

import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
	// Expected output
	// <li>Salad: 1</li>
	// <li>Bacon: 2</li>
	// <li>Cheese: 3</li>
	// <li>Meat: 1</li>
	const ingredientSummary = Object.keys(props.ingredients)
		.map(igKey => {
			return ( 
				<li key={igKey}>
					<span style={{ textTransform: 'capitalize' }} >{igKey}</span>: 
					{props.ingredients[igKey].value}
				</li>
			)
		})

	return (
		<React.Fragment>
			<h3>Your order</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>
				{ ingredientSummary }
			</ul>
			<p><strong>Total price: {props.price.toFixed(2)}</strong></p>
			<p>Continue to checkout?</p>
			<Button 
				btnType="Danger"
				clicked={props.purchaseCanceled} >
			Cancel</Button>
			<Button 
				btnType="Success"
				clicked={props.purchaseContinued} >
			Continue</Button>
		</React.Fragment>
	)
}

export default orderSummary;