import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from '../redux/index.js';

export default function configureStore() {
	let middleware = applyMiddleware(thunk);
	
	if (process.env.NODE_ENV === 'development') {
		middleware = composeWithDevTools(middleware);
	}
	
	const store = createStore(rootReducer, middleware);
	
	if (module.hot) {
		module.hot.accept('../redux', () => {
			const nextReducer = require('../redux/index.js');
			store.replaceReducer(nextReducer);
		});
	}
	
	return store;
}
