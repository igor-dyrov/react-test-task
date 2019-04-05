const express = require('express');

const app = express();

let generated = {};

const months = [
	{
		name: 'January',
		numOfDays: 31
	},
	{
		name: 'February',
		numOfDays: 28 // simplify
	}, {
		name: 'March',
		numOfDays: 31
	},
	{
		name: 'April',
		numOfDays: 30
	},
	{
		name: 'May',
		numOfDays: 31
	},
	{
		name: 'June',
		numOfDays: 30
	}, {
		name: 'July',
		numOfDays: 31
	}, {
		name: 'August',
		numOfDays: 31
	},
	{
		name: 'September',
		numOfDays: 30
	},
	{
		name: 'October',
		numOfDays: 31
	},
	{
		name: 'November',
		numOfDays: 30
	}, {
		name: 'December',
		numOfDays: 31
	}];

const years = [2012, 2013, 2014, 2015, 2016, 2017, 2018];

app.use('/api/data', (req, res) => {
	generated = {};
	years.forEach((year) => {
		generated[year] = {
			months: {}
		};
		months.forEach((month) => {
			generated[year].months[month.name] = [];
			for (let i = 0; i < month.numOfDays; i++) {
				let rand = Math.random() * (18);
				rand = Math.round(rand);
				generated[year].months[month.name].push(rand);
			}
		});
	});
	res.status(200);
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Content-Type', 'application/json');
	res.write(JSON.stringify({
		generated,
		years,
		months: months.map((month) => month.name),
	}));
	res.end();
});

app.listen(8000, () => console.log('Server running on http://localhost:8000/'));
