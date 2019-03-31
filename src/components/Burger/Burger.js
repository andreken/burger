import React from 'react';

import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
	// Transform an object of keys value pairs into an array
	let arrayIngredients = Object.keys(props.ingredients)
		.map(ingredientKey => {
			return [...Array(props.ingredients[ingredientKey].value)]
				.map((_, i) => {
					return <BurgerIngredient 
										key={ingredientKey+i} 
										type={ingredientKey} />
				})
		})
		// transform array into something else
		// Accept a callback function and an initial value
		// Doing so, i remove empty arrays for ingredients not added
		// es. [[],[],['meat'],[]] becames ['meat']
		.reduce((arr, el) => {
			return arr.concat(el)
		},[])
		
	if(arrayIngredients.length === 0){
		arrayIngredients = <p>Please start adding ingredients</p>
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{ arrayIngredients }
			<BurgerIngredient type="bread-bottom" />
		</div>
	)
}

export default burger;