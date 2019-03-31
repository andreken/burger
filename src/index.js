import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// Reducers
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth'
import { watchAuth, watchBurgerBuilder, wathOrder } from './store/sagas/index'

// Combine reducers
const rootReducer = combineReducers({
	burgerBuilder: burgerBuilderReducer,
	orders: orderReducer,
	auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

// Enable redux devTool only in development mode
// I can do so using environment variables
const composeEnhancers = process.env.NODE_ENV === 'development' ? 
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null
|| compose;

// Add middlewares
const enhancer = composeEnhancers(
  applyMiddleware(thunk, sagaMiddleware)
);

// Create store
const store = createStore(rootReducer, enhancer);
sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchBurgerBuilder)
sagaMiddleware.run(wathOrder)

// Enable routing
// The provider should wrap eveything
const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
)

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
