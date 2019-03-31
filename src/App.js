import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
// import Checkout from './containers/Checkout/Checkout'
// import Orders from './containers/Orders/Orders'
// import Auth from './containers/Auth/Auth'
// import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index'

// Lazy import
// When using that, wrap switch and routes inside Suspence component
const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Auth = lazy(() => import('./containers/Auth/Auth'))
const Logout = lazy(() => import('./containers/Auth/Logout/Logout'))

// Converted from class to functional component with react hooks
const app = props => {

  // componentDidMount(){
  //   this.props.onAutoSignin();
  // }
  // With React hooks: componentDidMount -> useEffect
  // I want to exec this only on the first render, so i pass an empty array
  useEffect(() => {
    props.onAutoSignin();
  }, [])

    // Guarding routes: decide if they are enabled
    // If a route doesn't exist redirect to home page
    let routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/auth" component={Auth} />
          <Redirect to="/" />
        </Switch>
    )
    if(props.isAuthenticated){
      routes = (
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Redirect to="/" />
          </Switch>
      )
    }

    // Wrapping routes with Suspense because i'm using lazy components
    // fallback prop define what to render while waiting for one of this lazy loading components to load
    return (
      <div className="">
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            { routes }
          </Suspense>
        </Layout>
      </div>
    );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignin: () => dispatch(actions.authCheckState())
  }
}

// Wrapping App into connect i also need to wrap it in withRouter
// to receive route props
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
