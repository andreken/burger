import React, {Component, useState} from 'react';
import { connect } from 'react-redux' 

import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer' 

// Converted from class to functional component with react hooks
const layout = props => {

	const [sideDrawer, setSideDrawer] = useState(false);
	// state = {
	// 	showSideDrawer: false
	// }

	const sideDrawerCloseHandler = () => {
		setSideDrawer(false);
		// this.setState({ showSideDrawer: false });
	}

	const sideDrawerToggleHandler = () => {
		// this.setState(prevState => (
		// 	{ showSideDrawer: !prevState.showSideDrawer }
		// ));
		setSideDrawer(!sideDrawer)
	}	

	return (
		<React.Fragment>
			<Toolbar
				isAuth={props.isAuthenticated} 
				clicked={sideDrawerToggleHandler} 
			/>
			<SideDrawer 
				isAuth={props.isAuthenticated} 
				closed={sideDrawerCloseHandler}
				// open={state.showSideDrawer}
				open={sideDrawer}
			/>
			<main className={classes.Content}>
				{ props.children }
			</main>
		</React.Fragment>
	)
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	}
}

export default connect(mapStateToProps)(layout);