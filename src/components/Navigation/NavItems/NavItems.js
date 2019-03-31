import React from 'react';

import classes from './NavItems.module.css'
import NavItem from './NavItem/NavItem'

const navItems = (props) => (
	<ul className={classes.NavItems} >
		<NavItem link="/" exact active={true} >
			Burger Builder
		</NavItem>
		{ 
			props.isAuthenticated
			? <NavItem link="/orders" active={false} >
			Orders</NavItem>
			: null
		}
		{
			props.isAuthenticated
				? <NavItem link="/logout" active={false} >
			Logout</NavItem>
				: <NavItem link="/auth" active={false} >
			Authenticate</NavItem>
		}	
	</ul>
)

export default navItems;