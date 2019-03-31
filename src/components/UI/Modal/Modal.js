import React from 'react'

import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'


// Converted from class to functional component with react hooks
const modal = props => {

	// I want to re-render modal only when show changes
	// Until when modal is not showed i don't need to update his values
	// I also check if children changes, to show the spinner
	// shouldComponentUpdate(nextProps, nextState){
	// 	return this.props.show !== nextProps.show
	// 		|| this.props.children !== nextProps.children;
	// }

	return (
		<React.Fragment>
			<Backdrop show={props.show} clicked={props.clicked} />
			<div className={classes.Modal}
				style={{ 
					transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
					opacity: props.show ? '1' : '0'
				}} >
				{ props.children }
			</div>
		</React.Fragment>	
	)
}

// shouldComponentUpdate -> React.memo
// Increase performance, updating only when props of this component change
// To check only for certain props, pass a second argument that is a custom function. Returns true or false to decide whether the props are equal or not. We have to return true when props are equal
export default React.memo(modal, (prevProps, nextProps) => {
	return prevProps.show === nextProps.show
			&& prevProps.children === nextProps.children;
});