import React from 'react';
import { NavLink } from 'react-router-dom'

import classes from './NavItem.module.css'

const navItem = (props) => (
	<li className={classes.NavItem}>
		<NavLink 
			// Passing exact key through props 
			// to enable it only for certain routes (/ and not /orders)
			to={props.link} exact={props.exact}
			activeClassName={classes.active} >
				{props.children}
		</NavLink>
	</li>
)

export default navItem;