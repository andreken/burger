import React from 'react';

// Make webpack aware of the fact that we are using this image
// and webpack will then handle it with a special plugin or module
// burgerLogo refers to the path where webpack stored the optimized and copied image
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css'

const logo = (props) => (
	<div className={classes.Logo}>
		<img src={burgerLogo} alt="MyBurger"/>
	</div>
)

export default logo;