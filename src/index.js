import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { watchAuth, watchBurgerBuilder } from './store/sagas/';

import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './store/reducers/auth';

// const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose
const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });
const rootReducer = combineReducers({
	burgerBuilder: burgerBuilderReducer,
	order: orderReducer,
	auth: authReducer,
});
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);
sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchBurgerBuilder)

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<Suspense fallback={<div>Loading...</div>}>
				<App />
			</Suspense>
		</BrowserRouter>
	</Provider>
);
ReactDOM.render(
	<React.StrictMode>{app}</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
