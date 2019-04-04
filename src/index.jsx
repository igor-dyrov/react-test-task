import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from './store';
import history from './middleware/history/history.js';
import App from './containers/App/App.jsx';
import { routes } from './routes.jsx';

import './static/css/reset.css';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<App routes={routes}/>
		</Router>
	</Provider>,
	document.getElementById('root')
);
