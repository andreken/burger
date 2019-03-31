import { useState, useEffect } from 'react';

export default httpClient => {

		const [error, setError] = useState(null);

		// Clear any error when making a new request
		const reqInterceptor = httpClient.interceptors.request.use(req => {
			setError(null)
			return req;
		})
		// Set error when the response returns an error
		const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
			setError(err)
		})

		// return the cleanup function
		// To run on onmounting, pass empty array. This will never change and therefore react will run the main content when component mounts and cleanup when it unmounts. Eventually we can pass interceptors to cleanup whenever they change
		useEffect(() => {
			return () => {
				httpClient.interceptors.request.eject(reqInterceptor)
				httpClient.interceptors.response.eject(resInterceptor)
			}
		}, [reqInterceptor, resInterceptor])

		// CLear any error
		const errorConfirmedHandler = () => {
			// this.setState({ error: null })
			setError(null)
		}

		// Return error obj and a function that allows us to clean this error
		return [error, errorConfirmedHandler];
}