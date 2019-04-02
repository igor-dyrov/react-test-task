import * as React from 'react';

import { Bar } from 'react-chartjs-2';
import './Main.css';

const exampleData = [
	{
		year: 2016,
		months: {
			January: [4, 1, 8, 9, 11, 0, 8],
			February: [0, 2, 8, 7, 11, 1, 6],
			March: [3, 1, 8, 9, 11, 0, 8],
			April: [2, 1, 8, 9, 11, 0, 8],
			May: [0, 1, 8, 9, 11, 0, 8],
			June: [8, 1, 8, 9, 11, 0, 8],
			July: [9, 1, 8, 9, 11, 0, 8],
			August: [11, 1, 8, 9, 11, 0, 8],
			September: [12, 1, 8, 9, 11, 0, 8],
			October: [1, 1, 8, 9, 11, 0, 8],
			November: [9, 1, 8, 9, 11, 0, 8],
			December: [4, 1, 8, 9, 11, 0, 8],
		},
	},
	{
		year: 2017,
		months: {
			January: [4, 1, 8, 9, 11, 0, 8],
			February: [0, 2, 8, 7, 11, 1, 6],
			March: [3, 1, 8, 9, 11, 0, 8],
			April: [2, 1, 8, 9, 11, 0, 8],
			May: [0, 1, 8, 9, 11, 0, 8],
			June: [8, 1, 8, 9, 11, 0, 8],
			July: [9, 1, 8, 9, 11, 0, 8],
			August: [11, 1, 8, 9, 11, 0, 8],
			September: [12, 1, 8, 9, 11, 0, 8],
			October: [1, 1, 8, 9, 11, 0, 8],
			November: [9, 1, 8, 9, 11, 0, 8],
			December: [4, 1, 8, 9, 11, 0, 8],
		},
	},
	{
		year: 2018,
		months: {
			January: [4, 1, 8, 9, 11, 0, 8],
			February: [0, 2, 8, 7, 11, 1, 6],
			March: [3, 1, 8, 9, 11, 0, 8],
			April: [2, 1, 8, 9, 11, 0, 8],
			May: [0, 1, 8, 9, 11, 0, 8],
			June: [8, 1, 8, 9, 11, 0, 8],
			July: [9, 1, 8, 9, 11, 0, 8],
			August: [11, 1, 8, 9, 11, 0, 8],
			September: [12, 1, 8, 9, 11, 0, 8],
			October: [1, 1, 8, 9, 11, 0, 8],
			November: [9, 1, 8, 9, 11, 0, 8],
			December: [4, 1, 8, 9, 11, 0, 8],
		},
	}
];

const monthsBar = {
	labels: [],
	datasets: [],
};

function getRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

// Object.keys(exampleData[0].months).forEach((monthLabel) => monthsBar.labels.push(monthLabel));

monthsBar.labels.push('year');
exampleData.forEach((year) => {
	const data = [];
	let sum = 0;
	Object.keys(year.months).forEach((month) => {
		year.months[month].forEach((val) => sum += val);
	});
	const avg = sum / 12 * 7;
	monthsBar.datasets.push({
		label: year.year,
		data: [avg],
		backgroundColor: getRandomColor()
	});
});

console.log(monthsBar);

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			barData: monthsBar,
		};
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

export default Main;
