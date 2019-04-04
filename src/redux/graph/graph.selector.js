import { createSelector } from 'reselect';

import { GraphModeTypes } from './graph.reducer.js';

function getRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

export const getMonths = createSelector((state) => state.graph.months, (months) => months);

export const getYears = createSelector((state) => state.graph.years, (years) => years);

export const getBarData = createSelector(
	[
		(state) => state.graph.initialObject,
		(state) => state.graph.mode,
		(state) => state.graph.selectedYear,
		(state) => state.graph.selectedMonth
	],
	(data, mode, yearNumber, monthName) => {
		const graphData = {
			labels: [],
			datasets: [],
		};
		switch (mode) {
		case GraphModeTypes.Years:
			graphData.labels = [];
			graphData.labels.push('years');
			Object.keys(data).forEach((year) => {
				let sum = 0;
				Object.keys(data[year].months).forEach((month) => {
					sum += data[year].months[month].reduce((accumulator, currentValue) => accumulator + currentValue);
				});
				graphData.datasets.push({
					label: year,
					data: [sum],
					backgroundColor: getRandomColor()
				});
			});
			break;
		case GraphModeTypes.Months:
			graphData.labels = [yearNumber];
			Object.keys(data[yearNumber].months).forEach((month) => {
				graphData.datasets.push({
					label: month,
					data: [data[yearNumber].months[month].reduce((accumulator, currentValue) => accumulator + currentValue)],
					backgroundColor: getRandomColor()
				});
			});
			break;
		case GraphModeTypes.Days:
			graphData.labels = [`${monthName} ${yearNumber}`];
			data[yearNumber].months[monthName].forEach((value, index) => {
				graphData.datasets.push({
					label: index + 1,
					data: [value],
					backgroundColor: getRandomColor()
				});
			});
			break;
		default:
			graphData.labels = ['None'];
			break;
		}
		return graphData;
	}
);

export const getMode = createSelector((state) => state.graph.mode, (mode) => mode);

export const getSelectedYear = createSelector((state) => state.graph.selectedYear, (selected) => selected);

export const getSelectedMonth = createSelector((state) => state.graph.selectedMonth, (selected) => selected);
