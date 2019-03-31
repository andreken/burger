import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

// Array of controls to add
const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' },
	{ label: 'Bacon', type: 'bacon' }
]

const buildControls = (props) => {
	return (
		<div className={classes.BuildControls} >
			<p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
			{ 
				controls.map(el => {
					return <BuildControl 
						key={el.type}
						label={el.label} 
						type={el.type}
						addIngredient={props.addIngredient}
						removeIngredient={props.removeIngredient} 
						disabled={props.disabled[el.type]}
					/>
				})
			}
			<button 
				className={classes.OrderButton}
				disabled={!props.purchasable}
				onClick={props.ordered}			
			>{props.isAuth ? 'ORDER NOW' : 'SIGNUP TO ORDER'}</button>
		</div>
	)
}

export default buildControls;