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
import { getMonths, getBarData, getYears } from '../../redux/graph/graph.selector.js';
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
		const cnMain = cn('main');
		return (
			<main>
				<div className={cnMain('control')}>
					<div className={cnMain('selects')}>
						<Select
							className={cnMain('select', { value: 'mode' })}
							options={['Year', 'Month', 'Day']}
							onClick={this._selectHandler}
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
		barData: getBarData(state),
		months: getMonths(state),
		years: getYears(state),
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
