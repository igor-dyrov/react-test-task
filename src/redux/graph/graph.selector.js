import { createSelector } from 'reselect';

import { GraphModeTypes } from './graph.reducer.js';

const lodash = require('lodash');

function getRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	lodash.range(6).forEach(() => color += letters[Math.floor(Math.random() * 16)]);
	return color;
}

export const makeGetMonths = () => createSelector((state) => state.graph.months, (months) => months);

export const makeGetYears = () => createSelector((state) => state.graph.years, (years) => years);

export const makeGetBarData = () => createSelector(
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
				const sum = Object.keys(data[year].months).reduce((curr, month) => {
					return data[year].months[month].reduce((accumulator, currentValue) => accumulator + currentValue);
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
			graphData.datasets = Object.keys(data[yearNumber].months).map((month) => {
				return {
					label: month,
					data: [data[yearNumber].months[month].reduce((accumulator, currentValue) => accumulator + currentValue)],
					backgroundColor: getRandomColor()
				};
			});
			break;
		case GraphModeTypes.Days:
			graphData.labels = [`${monthName} ${yearNumber}`];
			graphData.datasets = data[yearNumber].months[monthName].map((value, index) => {
				return {
					label: index + 1,
					data: [value],
					backgroundColor: getRandomColor()
				};
			});
			break;
		default:
			graphData.labels = ['None'];
			break;
		}
		return graphData;
	}
);

export const makeGetMode = () => createSelector((state) => state.graph.mode, (mode) => mode);

export const makeGetSelectedYear = () => createSelector((state) => state.graph.selectedYear, (selected) => selected);

export const makeGetSelectedMonth = () => createSelector((state) => state.graph.selectedMonth, (selected) => selected);
