import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class App extends Component {
	render() {
		const { routes } = this.props;
		
		return (
			<Switch>
				{routes}
			</Switch>
		);
	}
}

App.propTypes = {
	routes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
