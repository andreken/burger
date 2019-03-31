import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'
import {updateObject,checkValidity} from '../../shared/utility'

// Converted from class to functional component with react hooks
const auth = props => {

	const [controls, setControls] = useState({
			email: {
				elemType: 'input',
				elemConfig: {
					type: 'email',
					placeholder: 'Mail address'
				},
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				value: ''
			},
			password: {
				elemType: 'input',
				elemConfig: {
					type: 'password',
					placeholder: 'Password'
				},
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				value: ''
			}
	});
	const [isSignup, setIsSignup] = useState(true)

	// Reset path when we reach this page
	// while not building a burger
	// componentDidMount(){
	// 	if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
	// 		this.props.onSetAuthRedirectPath();
	// 	}
	// }

	useEffect(() => {
		if(!props.buildingBurger && props.authRedirectPath !== '/'){
			props.onSetAuthRedirectPath();
		}
	}, [])

	const inputChangedHandler = (event, inputId) => {
		// Create a clone of controls object
		// Also create a clone of the object that represent the form element changed
		const controlsUpd = updateObject(controls, {
			[inputId]: updateObject(controls[inputId], {
				value: event.target.value,
				valid: checkValidity(event.target.value, controls[inputId].validation)
			})
		})
		// this.setState({
		// 	controls: controls
		// 	// formIsValid: formIsValid
		// })
		setControls(controlsUpd)
	}

	const submitHandler = (event) => {
		const { email, password } = controls
		const mode = isSignup ? 'UP' : 'IN'
		// Prevent page reload
		event.preventDefault();
		props.onAuth(email.value, password.value, mode)
	}

	const switchAuthModeHandler = () => {
		// this.setState(prevState => {
		// 	return {
		// 		isSignup: !prevState.isSignup
		// 	}
		// })
		setIsSignup(!isSignup)
	}

	// Create an array of javascript objects
	const formElementsArray = [];
	for(let key in controls) {
		formElementsArray.push({
			id: key,
			config: controls[key]
		})
	}
	// Create form input elements
	let form = formElementsArray.map(formElement => {
		return <Input 
			key={formElement.id}
			elemType={formElement.config.elemType}
			elemConfig={formElement.config.elemConfig}
			value={formElement.config.value}
			valid={formElement.config.valid}
			changed={(e) => inputChangedHandler(e,formElement.id)}
		/>
	})

	// If loading (signin/signup) show spinner
	if(props.loading){
		form = <Spinner />
	}

	// Output error if exists
	let errorMessage = null;
	if(props.error){
		errorMessage = (
			<p>{props.error.message}</p>
		)
	}

	// Redirect to home when authenticated
	// Because the current path is no more visible
	let authRedirect = null;
	if(props.isAuthenticated){
		authRedirect = <Redirect to={props.authRedirectPath} />
	}

	// return form
	return (
		<div className={classes.Auth}>
			{ authRedirect }
			{ errorMessage }
			<form onSubmit={submitHandler} >
				{ form }
				<Button btnType="Success">SUBMIT</Button>
			</form>
			<Button 
				clicked={switchAuthModeHandler}
				btnType="Danger" >
				SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
			</Button>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		buildingBurger: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (mail, psw, mode) => dispatch(actions.auth(mail, psw, mode)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);