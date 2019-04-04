import * as React from 'react';
import { Route, Switch } from 'react-router';

import Main from './containers/Main/Main.jsx';

export const PATHS = {
	MENU: '/',
	ERROR: '/404',
};

export const routes = (
	<Switch>
		<Route exact path={PATHS.MENU} component={Main}/>
	</Switch>
);
