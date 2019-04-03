import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';

import { sortDataByYears, initDataObject, sortDataByMonths } from '../../redux/graph/graph.action.js';
import './Main.css';

class Main extends React.Component {
	componentDidMount() {
		setTimeout(() => this.props.setSortingByMonths(2013), 1000);
		const { initGraphData } = this.props;
		fetch('http://localhost:8000/api/data')
			.then((response) => response.json())
			.then((response) => initGraphData(response));
	}
	
	render() {
		const { barData } = this.props;

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
	setSortingByMonths: PropTypes.func,
	initGraphData: PropTypes.func,
	barData: PropTypes.array,
};

Main.defaultProps = {
	barData: [],
	setSortingByYears: () => {},
	setSortingByMonths: () => {},
	initGraphData: () => {},
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
		},
		initGraphData(data) {
			dispatch(initDataObject(data));
		},
		setSortingByMonths(year) {
			dispatch(sortDataByMonths(year));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
