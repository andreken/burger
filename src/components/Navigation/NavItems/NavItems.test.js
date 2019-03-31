import React from 'react';
// enzyme: testing package developed by airbnb
// allows to render a single component stand alone indipendent from the entire application
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavItems from './NavItems';
import NavItem from './NavItem/NavItem';

// connect enzyme
configure({adapter: new Adapter()});

// describe: contains tests
// Description of the file
// Testing function
// it: write one individual test
// Description of the test
describe('<NavItems />', () => {
	// Function automatically executed before each test
	let wrapper;
	beforeEach(() => {
		// Create an istance of this component as it would be rendered to the real dom
		wrapper = shallow(<NavItems />)
	})

	it('should render 2 <NavItem /> elements if not authenticated', () =>{
		// Have a look into the rendered component to see what was rendered for the case isAuthenticated = false
		// I check if it actually contain 2 NavItem elements
		expect(wrapper.find(NavItem)).toHaveLength(2);
	})

	it('should render 3 <NavItem /> elements if authenticated', () => {
		// Passing props to the component
		wrapper.setProps({isAuthenticated: true});
		expect(wrapper.find(NavItem)).toHaveLength(3);
	})

	it('should contain Burger,Auth if not authenticated', () => {
		expect(wrapper.contains(<NavItem link="/" exact active={true} >Burger Builder</NavItem>)).toEqual(true);
		expect(wrapper.contains(<NavItem link="/auth" active={false} >
			Authenticate</NavItem>)).toEqual(true);
	})

	it('should contain Burger,Orders,Logout if authenticated', () => {
		// Passing props to the component
		wrapper.setProps({isAuthenticated: true});
		expect(wrapper.contains(<NavItem link="/" exact active={true} >Burger Builder</NavItem>)).toEqual(true);
		expect(wrapper.contains(<NavItem link="/orders" active={false} >
			Orders</NavItem>)).toEqual(true);
		expect(wrapper.contains(<NavItem link="/logout" active={false} >
			Logout</NavItem>)).toEqual(true);
	})

})