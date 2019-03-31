import React from 'react'

import classes from './Order.module.css'

const order = (props) => {
	// Transform ingredients obj into an array
	const ingredients = [];
	for(let ingredientName in props.ingredients){
		ingredients.push({
			...props.ingredients[ingredientName],
			name: ingredientName 
		})
	}
	// Return a list of ingredients with name and amount
	const ingredientsOutput = ingredients.map(ig => {
		return <span key={ig.name}>{ig.name} ({ig.value})</span>
	})

	return (
		<div className={classes.Order}>
			<div>Ingredients: {ingredientsOutput}</div>
			<p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>		
		</div>
	)
}

export default order;