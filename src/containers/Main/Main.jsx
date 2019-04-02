import * as React from 'react';

import Chart from 'chart.js';
import './Main.css';

const barData = {
	labels: ['Italy', 'UK', 'USA', 'Germany', 'France', 'Japan'],
	datasets: [
		{
			label: '2010 customers #',
			fillColor: '#382765',
			data: [2500, 1902, 1041, 610, 1245, 952]
		},
		{
			label: '2014 customers #',
			fillColor: '#7bc225',
			data: [3104, 1689, 1318, 589, 1199, 1436]
		}
	]
};

class Main extends React.Component {
	componentDidMount() {
		const context = document.getElementById('graph').getContext('2d');
		const clientsChart = new Chart(context, {
			data: barData,
			type: 'bar'
		});
	}
	
	render() {
		return (
			<div className='container'>
				<h1>Hello, world!</h1>
				<canvas id='graph'/>
			</div>
		);
	}
}

export default Main;
