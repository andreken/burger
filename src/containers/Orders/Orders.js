import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

// Converted from class to functional component with react hooks
const orders = props => {

	// state = {
	// 	orders: [],
	// 	loading: true
	// }

	// I only want to fetch orders when this is loaded
	// componentDidMount() {
	// 	// axios.get('/orders.json')
	// 	// 	.then(res => {
	// 	// 		// Turns order obj into an array
	// 	// 		// distribute values to add id
	// 	// 		const arrayOrders = [];
	// 	// 		for(let key in res.data){
	// 	// 			arrayOrders.push({ 
	// 	// 				...res.data[key],
	// 	// 				id: key
	// 	// 			});
	// 	// 		}
	// 	// 		this.setState({ 
	// 	// 			loading: false,
	// 	// 			orders: arrayOrders 
	// 	// 		})
	// 	// 	})
	// 	// 	.catch(e => {
	// 	// 		this.setState({ loading: false })
	// 	// 	})
	// 	// I want to see only orders of the logged user
	// 	this.props.onFetchOrders(this.props.token, this.props.userId);
	// }

	// useEffect onmount
	useEffect(() => {
		props.onFetchOrders(props.token, props.userId);
	}, [])

	let orders = <Spinner />;
	if(!props.loading){
		orders = (
			props.orders.map(order => {
				return <Order 
					key={order.id}
					ingredients={order.ingredients} 
					price={order.price} />
			})
		)
	}
	return (
		<div>
			{ orders }
		</div>
	)
}

const mapStateToProps = state => {
	return {
		orders: state.orders.orders,
		loading: state.orders.loading,
		token: state.auth.token,
		userId: state.auth.userId
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders,axios));