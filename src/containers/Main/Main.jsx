import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';

import { sortDataByYears } from '../../redux/graph/graph.action.js';
import './Main.css';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			barData: [],
		};
	}
	
	componentDidMount() {
		fetch('http://localhost:8000/api/data')
			.then((response) => response.json())
			.then((response) => console.log(response));
	}
	
	render() {
		const { barData } = this.state;

		return (
			<div className='container'>
				<h1>Hello, world!</h1>
				<Bar
					data={barData}
				/>
			</div>
		);
	}
}

Main.propTypes = {
	setSortingByYears: PropTypes.func,
	barData: PropTypes.object.isRequired,
};

Main.defaultProps = {
	setSortingByYears: () => {},
};

const mapStateToProps = (state) => {
	return {
		barData: state.graph.graphData
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setSortingByYears() {
			dispatch(sortDataByYears());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
