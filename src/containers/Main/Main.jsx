import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';

import { sortDataByYears, initDataObject, sortDataByMonths, sortDataByDays } from '../../redux/graph/graph.action.js';
import './Main.css';

class Main extends React.Component {
	componentDidMount() {
		setTimeout(() => this.props.setSortingByDays(2013, 'February'), 1000);
		const { initGraphData } = this.props;
		fetch('http://localhost:8000/api/data')
			.then((response) => response.json())
			.then((response) => initGraphData(response));
	}
	
	render() {
		const { barData } = this.props;
		const { years } = this.props;
		const { months } = this.props;
		
		return (
			<main>
				<div className='main-block__control'>
					<select>
						{years.map((year) => <option key={year} value={year}/>)}
					</select>
					<select>
						{months.map((month) => <option key={month} value={month}/>)}
					</select>
				</div>
				<div className='main-block__bar'>
					<Bar
						data={barData}
					/>
				</div>
			</main>
		);
	}
}

Main.propTypes = {
	barData: PropTypes.array,
	months: PropTypes.array,
	years: PropTypes.array,
	setSortingByYears: PropTypes.func,
	setSortingByMonths: PropTypes.func,
	setSortingByDays: PropTypes.func,
	initGraphData: PropTypes.func,
};

Main.defaultProps = {
	barData: {},
	months: [],
	years: [],
	setSortingByYears: () => {},
	setSortingByMonths: () => {},
	setSortingByDays: () => {},
	initGraphData: () => {},
};

const mapStateToProps = (state) => {
	return {
		barData: state.graph.graphData,
		months: state.graph.months,
		years: state.graph.years,
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
		},
		setSortingByDays(year, month) {
			dispatch(sortDataByDays(year, month));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
