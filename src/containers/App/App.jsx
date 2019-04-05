import React from 'react';
import { Switch, withRouter } from 'react-router';
import PropTypes from 'prop-types';

const App = (props) => {
	const { routes } = props;
	
	return (
		<Switch>
			{routes}
		</Switch>
	);
};

App.propTypes = {
	routes: PropTypes.object.isRequired,
};

export default withRouter(App);
