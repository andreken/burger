import React from 'react';
import classes from './Input.module.css'

const input = (props) => {

	let inputElem = null;
	switch(props.elemType){
		case('input'):
			inputElem = <input className={classes.InputElem} 
				{...props.elemConfig} value={props.value} 
				onChange={props.changed}/>
			break;
		case('textarea'):
			inputElem = <textarea className={classes.InputElem} 
				{...props.elemConfig} value={props.value} 
				onChange={props.changed}/>
			break;
		case('select'):
			inputElem = <select className={classes.InputElem} 
				value={props.value} 
				onChange={props.changed}>
					{ props.elemConfig.options.map(opt => {
							return <option key={opt.value} value={opt.value}>{opt.name}</option>
						}) }
				</select>	
			break;
		default:
			inputElem = <input className={classes.InputElem} 
				{...props.elemConfig} value={props.value}	/>	
	}
	
	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{ inputElem }
			<span className={classes.Span} style={{ visibility: props.valid ? 'hidden' : 'visible' }} >
				Please insert a valid value</span>
		</div>
	)

}

export default input