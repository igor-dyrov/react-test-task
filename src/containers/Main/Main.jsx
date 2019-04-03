import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';

import { sortDataByYears, initDataObject, sortDataByMonths, sortDataByDays } from '../../redux/graph/graph.action.js';
import './Main.css';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this._yearHandler = this.handleYearSelecting.bind(this);
		this._monthHandler = this.handleMonthSelecting.bind(this);
		this._selectHandler = this.handleSelectVisibility.bind(this);
		this.state = {
			yearSelectIsVisible: false,
			monthSelectIsVisible: false,
			selectedYear: '',
			selectedMonth: '',
		};
	}

	componentWillMount() {
		const { initGraphData } = this.props;
		const { setSortingByYears } = this.props;
		fetch('http://localhost:8000/api/data')
			.then((response) => response.json())
			.then((response) => {
				initGraphData(response);
				const { years } = this.props;
				const { months } = this.props;
				this.setState({
					selectedYear: years[0],
					selectedMonth: months[0],
				});
				setSortingByYears();
			});
	}

	handleSelectVisibility(event) {
		const { setSortingByYears } = this.props;
		const { setSortingByMonths } = this.props;
		const { setSortingByDays } = this.props;
		const { selectedYear } = this.state;
		const { selectedMonth } = this.state;
		if (event.target.value === 'Month') {
			this.setState({
				yearSelectIsVisible: true,
				monthSelectIsVisible: false,
			});
			setSortingByMonths(selectedYear);
		} else if (event.target.value === 'Day') {
			this.setState({
				yearSelectIsVisible: true,
				monthSelectIsVisible: true,
			});
			setSortingByDays(selectedYear, selectedMonth);
		} else {
			this.setState({
				yearSelectIsVisible: false,
				monthSelectIsVisible: false,
			});
			setSortingByYears();
		}
	}

	handleYearSelecting(event) {
		const { setSortingByMonths } = this.props;
		const { setSortingByDays } = this.props;
		const { monthSelectIsVisible } = this.state;
		const { selectedMonth } = this.state;
		this.setState({
			selectedYear: event.target.value
		});
		if (monthSelectIsVisible) {
			setSortingByDays(event.target.value, selectedMonth);
		} else {
			setSortingByMonths(event.target.value);
		}
	}

	handleMonthSelecting(event) {
		const { setSortingByDays } = this.props;
		const { selectedYear } = this.state;
		this.setState({
			selectedMonth: event.target.value
		});
		setSortingByDays(selectedYear, event.target.value);
	}

	render() {
		const { barData } = this.props;
		const { years } = this.props;
		const { months } = this.props;
		const { yearSelectIsVisible } = this.state;
		const { monthSelectIsVisible } = this.state;

		return (
			<main>
				<div className='main-block__control'>
					<select onClick={this._selectHandler}>
						<option value='Year'>Year</option>
						<option value='Month'>Month</option>
						<option value='Day'>Day</option>
					</select>
					{yearSelectIsVisible ? (
						<select onClick={this._yearHandler}>
							{years.map((year) => <option key={year} value={year}>{year}</option>)}
						</select>
					) : null}
					{monthSelectIsVisible ? (
						<select onClick={this._monthHandler}>
							{months.map((month) => <option key={month}>{month}</option>)}
						</select>
					) : null}
				</div>
				<div className='main-block__bar'>
					<Bar data={barData}/>
				</div>
			</main>
		);
	}
}

Main.propTypes = {
	barData: PropTypes.object,
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
