import React from 'react';

import Logo from '../../Logo/Logo'
import NavItems from '../NavItems/NavItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

// Wrap logo into a div to set different height
const sideDrawer = (props) => {
	// Conditionally add classes for animations to open/close the side drawer
	let attachedClasses = [classes.SideDrawer,classes.Close]
	if (props.open) {
		attachedClasses = [classes.SideDrawer, classes.Open]
	}

	return (
		<React.Fragment>
			<Backdrop show={props.open} clicked={props.closed} />
			<div 
				className={attachedClasses.join(' ')} 
				// When i click on the sidebar i want to close it
				onClick={props.closed} >
				<div style={{'height': '11%', 'marginBottom':'32px'}}>
					<Logo />
				</div>
				<nav>
					<NavItems isAuthenticated={props.isAuth} />
				</nav>
			</div>
		</React.Fragment>	
	)
	
}

export default sideDrawer;