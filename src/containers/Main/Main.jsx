import * as React from 'react';
import { compose } from '@bem-react/core';
import { cn } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';

import ButtonPresenter from '../../components/Button/Button.jsx';
import withButtonTypeLink from '../../components/Button/_type/Button_type_link';
import withButtonThemeAction from '../../components/Button/_theme/Button_theme_action.jsx';

import Select from '../../components/Select/Select.jsx';
import {
	sortDataByYears,
	initDataObject,
	sortDataByMonths,
	sortDataByDays
} from '../../redux/graph/graph.action.js';

import {
	makeGetMonths,
	makeGetBarData,
	makeGetYears,
	makeGetMode,
	makeGetSelectedMonth,
	makeGetSelectedYear
} from '../../redux/graph/graph.selector.js';

import { yearSelectorIsVisible, monthSelectorIsVisible } from './main.selector.js';
import './Main.css';

const Button = compose(
	withButtonThemeAction,
	withButtonTypeLink,
)(ButtonPresenter);

class Main extends React.Component {
	componentWillMount() {
		const { setSortingByYears } = this.props;
		this.reGenerateData();
		setSortingByYears();
	}
	
	reGenerateData = () => {
		const { initGraphData } = this.props;
		fetch('http://localhost:8000/api/data')
			.then((response) => response.json())
			.then((response) => initGraphData(response));
	};
	
	handleModeSelecting = (event) => {
		const {
			setSortingByYears,
			setSortingByDays,
			setSortingByMonths,
			selectedMonth,
			selectedYear
		} = this.props;
		if (event.target.value === 'Month') {
			setSortingByMonths(selectedYear);
		} else if (event.target.value === 'Day') {
			setSortingByDays(+selectedYear, selectedMonth);
		} else {
			setSortingByYears();
		}
	};
	
	handleYearSelecting = (event) => {
		const {
			setSortingByMonths,
			setSortingByDays,
			selectedMonth,
		} = this.props;
		if (monthSelectorIsVisible(this.props)) {
			setSortingByDays(+event.target.value, selectedMonth);
		} else {
			setSortingByMonths(+event.target.value);
		}
	};
	
	handleMonthSelecting = (event) => {
		const {
			setSortingByDays,
			selectedYear,
		} = this.props;
		setSortingByDays(+selectedYear, event.target.value);
	};
	
	render() {
		const {
			barData,
			years,
			months,
		} = this.props;
		const yearSelectIsVisible = yearSelectorIsVisible(this.props);
		const monthSelectIsVisible = monthSelectorIsVisible(this.props);
		const cnMain = cn('main');
		return (
			<main>
				<div className={cnMain('control')}>
					<div className={cnMain('selects')}>
						<Select
							className={cnMain('select', { value: 'mode' })}
							options={['Year', 'Month', 'Day']}
							onClick={this.handleModeSelecting}
						/>
						{yearSelectIsVisible ? (
							<Select
								className={cnMain('select', { value: 'year' })}
								options={years}
								onClick={this.handleYearSelecting}
							/>
						) : null}
						{monthSelectIsVisible ? (
							<Select
								className={cnMain('select', { value: 'month' })}
								options={months}
								onClick={this.handleMonthSelecting}
							/>
						) : null}
					</div>
					<div className={cnMain('buttons')}>
						<Button theme='action' onClick={this.reGenerateData}>Regenerate</Button>
						<Button type='link' href='https://github.com/igor-dyrov'>My GitHub</Button>
					</div>
				</div>
				<div className={cnMain('bar')}>
					<Bar data={barData}/>
				</div>
			</main>
		);
	}
}

Main.propTypes = {
	barData: PropTypes.object.isRequired,
	months: PropTypes.array.isRequired,
	years: PropTypes.array.isRequired,
	setSortingByYears: PropTypes.func.isRequired,
	setSortingByMonths: PropTypes.func.isRequired,
	setSortingByDays: PropTypes.func.isRequired,
	initGraphData: PropTypes.func.isRequired,
	selectedYear: PropTypes.number.isRequired,
	selectedMonth: PropTypes.string.isRequired,
};

const makeStateToProps = () => {
	const getBarData = makeGetBarData();
	const getMonths = makeGetMonths();
	const getYears = makeGetYears();
	const getMode = makeGetMode();
	const getSelectedMonth = makeGetSelectedMonth();
	const getSelectedYear = makeGetSelectedYear();
	
	return (state) => {
		return {
			barData: getBarData(state),
			months: getMonths(state),
			years: getYears(state),
			mode: getMode(state),
			selectedYear: getSelectedYear(state),
			selectedMonth: getSelectedMonth(state),
		};
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setSortingByYears: () => dispatch(sortDataByYears()),
		initGraphData: (data) => dispatch(initDataObject(data)),
		setSortingByMonths: (year) => dispatch(sortDataByMonths(year)),
		setSortingByDays: (year, month) => dispatch(sortDataByDays(year, month)),
	};
};

export default connect(makeStateToProps(), mapDispatchToProps)(Main);
