import React, { useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'

import * as actions from '../../../store/actions/index';

// as soon as I enter to this component I want to logout
// Converted from class to functional component with react hooks
const logout = props => {
	
	// componentDidMount(){
	// 	this.props.onLogout();
	// }
	useEffect(() => {
		props.onLogout();
	},[])


	return <Redirect to="/" />
}

const mapDispatchToProps = dispatch => {
	return {
		onLogout: () => dispatch(actions.logout())
	}
}

export default connect(null, mapDispatchToProps)(logout);