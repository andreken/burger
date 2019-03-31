export const updateObject = (oldObj, newProps) => {
	return {
		...oldObj,
		...newProps
	}
}

// Used by contact data and auth to check form validity
export const 	checkValidity = (value, rules) => {
	const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if((rules.required && value.trim() == '') ||
		 (rules.minLength && value.length < rules.minLength) ||
		 (rules.maxLength && value.length > rules.maxLength) ||
		 (rules.isEmail && !regExp.test(value))){
		return false
	}
	return true
}