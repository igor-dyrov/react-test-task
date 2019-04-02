function getRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}


const initialState = {
	initialObject: [],
	graphData: []
};

export const GraphActionTypes = {
	FulfillDataObject: 'FULFILL_DATA_OBJECT',
	SetAvgByYears: 'SET_AVG_BY_YEARS',
	SetAvgByMonths: 'SET_AVG_BY_MONTHS',
	SetSortByMonth: 'SET_SORT_BY_MONTH',
};

export function graph(state = initialState, action) {
	switch (action.type) {
	case GraphActionTypes.FulfillDataObject:
		return {
			...state,
			initialObject: action.data
		};
	case GraphActionTypes.SetAvgByYears:
		console.log(state);
		const graphData = {
			labels: [],
			datasets: [],
		};
		graphData.labels = [];
		graphData.labels.push('years');
		Object.keys(state.initialObject).forEach((year) => {
			let sum = 0;
			Object.keys(state.initialObject[year].months).forEach((month) => {
				state.initialObject[year].months[month].forEach((val) => sum += val);
			});
			const avg = sum / 12 * 7;
			graphData.datasets.push({
				label: year,
				data: [avg],
				backgroundColor: getRandomColor()
			});
		});
		console.log(graphData);
		return {
			...state,
			graphData: graphData,
		};
	default:
		return state;
	}
}
