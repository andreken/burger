import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo'
import NavItems from '../NavItems/NavItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle' 

// Wrap logo into a div to set different height
const toolbar = (props) => (
	<header className={classes.Toolbar} >
		<DrawerToggle clicked={props.clicked} />
		<div style={{'height': '80%'}}>
			<Logo />
		</div>
		<nav>
			<NavItems isAuthenticated={props.isAuth} />
		</nav>
	</header>
)

export default toolbar;