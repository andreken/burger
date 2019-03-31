import React, { useState } from 'react'
import { connect } from 'react-redux'
import classes from './ContactData.module.css'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import axios from '../../../axios-orders'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/index'
import {updateObject,checkValidity} from '../../../shared/utility'

// Converted from class to functional component with react hooks
const contactData = props => {

	// Split state, one for orderFrom and one for formIsValid
	const [orderForm, setOrderForm] = useState({
			name: {
				elemType: 'input',
				elemConfig: {
					type: 'text',
					placeholder: 'Your name'
				},
				validation: {
					required: true,
					minLength: 3
				},
				valid: false,
				value: ''
			},
			street: {
				elemType: 'input',
				elemConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				validation: {
					required: true
				},
				valid: false,
				value: ''
			},
			zipCode: {
				elemType: 'input',
				elemConfig: {
					type: 'text',
					placeholder: 'Zip code'
				},
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid: false,
				value: ''
			},		
			country: {
				elemType: 'input',
				elemConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				validation: {
					required: true
				},
				valid: false,
				value: ''
			},	
			email: {
				elemType: 'input',
				elemConfig: {
					type: 'email',
					placeholder: 'Your e-mail'
				},
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				value: ''
			},	
			deliveryMethod: {
				elemType: 'select',
				elemConfig: {
					options: [
						{value: 'F', name: 'Fastest'},
						{value: 'C', name: 'Cheapest'}
					]
				},
				validation: {},
				valid: true,
				value: 'F'
			}
		});
	const [formIsValid, setFormIsValid] = useState(false);


	const inputChangedHandler = (event, inputId) => {
		// Create a clone of the object that represent the form element changed
		const orderFormElem = updateObject(orderForm[inputId], {
			value: event.target.value,
			valid: checkValidity(event.target.value, orderForm[inputId].validation)
		})
		const orderFormUpd = updateObject(orderForm, {
			[inputId]: orderFormElem
		})
		// Check form validity
		let formIsValid = true;
		for(let inputIdx in orderForm){
			// false must overrides true
			formIsValid = orderForm[inputIdx].valid && formIsValid
		}
		// this.setState({
		// 	orderForm: orderForm,
		// 	formIsValid: formIsValid
		// })
		setOrderForm(orderFormUpd);
		setFormIsValid(formIsValid);

	}

	const orderHandler = (event) => {
		// Prevent default behaviour,
		// that will be sending data and reload page
		event.preventDefault();
		// Create an object containing name and value from orderForm
		const formData = {}
		for (let name in orderForm){
			formData[name] = orderForm[name].value
		}
		// Create the order object to save
		const order = {
			ingredients: props.ings,
			price: props.price,
			orderData: formData,
			// mapping order to the user
			userId: props.userId
		}

		props.onOrderBurger(order, props.token);
		// for firebase: any node name of your choise + .json
		// When saving on db is ended with success:
		// 	stop loading and return to the main page	
		// Moved on action creator
		// axios.post('/orders.json', order)
		// 	.then(response => {
		// 		this.setState({ loading: false });
		// 		this.props.history.push('/');
		// 	})
		// 	.catch(error => {
		// 		this.setState({ loading: false });
		// 	})
	}


	// Create an array of javascript objects
	const formElementsArray = [];
	for(let key in orderForm) {
		formElementsArray.push({
			id: key,
			config: orderForm[key]
		})
	}
	// Create all form elements passing attributes from state
	let form = (
		<form onSubmit={orderHandler}>
			{ 
				formElementsArray.map(formElement => {
					return <Input
						key={formElement.id}
						elemType={formElement.config.elemType}
						elemConfig={formElement.config.elemConfig}
						value={formElement.config.value}
						valid={formElement.config.valid}
						changed={(e) => inputChangedHandler(e,formElement.id)}
					/>
				})
			}
			<Button btnType="Success" 
				disable={!formIsValid}>ORDER</Button>
		</form>
	)
	if(props.loading) {
		form = <Spinner />
	}
	return (
		<div className={classes.ContactData}>
			<h4>Enter your contact data</h4>
			{ form }
		</div>
	)
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.orders.loading,
		token: state.auth.token,
		userId: state.auth.userId
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));