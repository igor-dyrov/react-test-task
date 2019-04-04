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
	getMonths,
	getBarData,
	getYears,
	getMode,
	getSelectedMonth,
	getSelectedYear
} from '../../redux/graph/graph.selector.js';
import { yearSelectorIsVisible, monthSelectorIsVisible } from './main.selector.js';
import './Main.css';

const Button = compose(
	withButtonThemeAction,
	withButtonTypeLink,
)(ButtonPresenter);

class Main extends React.Component {
	constructor(props) {
		super(props);
		this._yearHandler = this.handleYearSelecting.bind(this);
		this._monthHandler = this.handleMonthSelecting.bind(this);
		this._modeHandler = this.handleModeVisibility.bind(this);
		this._reGenerateHandler = this.reGenerateData.bind(this);
	}

	componentWillMount() {
		this.reGenerateData();
	}
	
	reGenerateData() {
		const { initGraphData } = this.props;
		const { setSortingByYears } = this.props;
		fetch('http://localhost:8000/api/data')
			.then((response) => response.json())
			.then((response) => {
				initGraphData(response);
				setSortingByYears();
			});
	}
	
	handleModeVisibility(event) {
		const { setSortingByYears } = this.props;
		const { setSortingByMonths } = this.props;
		const { setSortingByDays } = this.props;
		const { selectedYear } = this.props;
		const { selectedMonth } = this.props;
		if (event.target.value === 'Month') {
			setSortingByMonths(selectedYear);
		} else if (event.target.value === 'Day') {
			setSortingByDays(+selectedYear, selectedMonth);
		} else {
			setSortingByYears();
		}
	}

	handleYearSelecting(event) {
		const { setSortingByMonths } = this.props;
		const { setSortingByDays } = this.props;
		const { selectedMonth } = this.props;
		if (monthSelectorIsVisible(this.props)) {
			setSortingByDays(+event.target.value, selectedMonth);
		} else {
			setSortingByMonths(+event.target.value);
		}
	}

	handleMonthSelecting(event) {
		const { setSortingByDays } = this.props;
		const { selectedYear } = this.props;
		setSortingByDays(+selectedYear, event.target.value);
	}

	render() {
		const { barData } = this.props;
		const { years } = this.props;
		const { months } = this.props;
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
							onClick={this._modeHandler}
						/>
						{yearSelectIsVisible ? (
							<Select
								className={cnMain('select', { value: 'year' })}
								options={years}
								onClick={this._yearHandler}
							/>
						) : null}
						{monthSelectIsVisible ? (
							<Select
								className={cnMain('select', { value: 'month' })}
								options={months}
								onClick={this._monthHandler}
							/>
						) : null}
					</div>
					<div className={cnMain('buttons')}>
						<Button theme='action'>Regenerate</Button>
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

const mapStateToProps = (state) => {
	return {
		barData: getBarData(state),
		months: getMonths(state),
		years: getYears(state),
		mode: getMode(state),
		selectedYear: getSelectedYear(state),
		selectedMonth: getSelectedMonth(state),
	};
};

const mapDispatchToProps = (dispatch) => {
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
