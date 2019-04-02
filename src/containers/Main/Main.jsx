import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';

import { sortDataByYears, initDataObject } from '../../redux/graph/graph.action.js';
import './Main.css';

class Main extends React.Component {
	componentDidMount() {
		setTimeout(() => this.props.setSortingByYears([]), 1000);
		const { initGraphData } = this.props;
		fetch('http://localhost:8000/api/data')
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
				initGraphData(response);
			});
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
	initGraphData: PropTypes.func,
	barData: PropTypes.array,
};

Main.defaultProps = {
	barData: [],
	setSortingByYears: () => {},
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
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
