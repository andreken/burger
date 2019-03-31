import React from 'react';

import Modal from '../../components/UI/Modal/Modal'
import useHttpErrorHandler from '../../hooks/http-error-handler'

// Function that wraps a component to handle errors.
// If there are error it will shows a modal
// Every time we wrap an element, the class is created
// and so the interceptors are created again
// Having multiple interceptors attached to the same instance

const withErrorHandler = (WrappedComponent, axios) => {
	// Convert from class to functional component with react hooks
	return props => {

		// state = {
		// 	error: null
		// }
		// Using a custom hook
		const [error, clearError] = useHttpErrorHandler(axios);

		// Intercept API calls
		// Using WillMount instead of DIdMount
		// I can register interceptors before child components are rendered
		// componentWillMount() {
		// 	// Clear any error when making a new request
		// 	this.reqInterceptor = axios.interceptors.request.use(req => {
		// 		this.setState({ error: null });
		// 		return req;
		// 	})
		// 	// Set error when the response returns an error
		// 	this.resInterceptor = axios.interceptors.response.use(res => res, err => {
		// 		this.setState({ err });
		// 	})
		// }


		// to avoid errors or a lack of memory
		// i remove interceptors when this component is unmounted
		// componentWillUnmount() {
		// 	axios.interceptors.request.eject(this.reqInterceptor)
		// 	axios.interceptors.response.eject(this.resInterceptor)
		// }

		// CLear any error
		// const errorConfirmedHandler = () => {
		// 	this.setState({ error: null })
		// }

		return (
			<React.Fragment>
				<Modal 
					show={error}
					clicked={clearError}
				>
					{ error ? error.message : null }
				</Modal>
				<WrappedComponent {...props} />
			</React.Fragment>
		)
	}
}

export default withErrorHandler;