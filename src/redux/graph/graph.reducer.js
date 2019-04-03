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
	graphData: [],
	years: [],
	months: [],
};

export const GraphActionTypes = {
	FulfillDataObject: 'FULFILL_DATA_OBJECT',
	SetAvgByYears: 'SET_AVG_BY_YEARS',
	SetAvgByMonths: 'SET_AVG_BY_MONTHS',
	SetSelectionByMonth: 'SET_SELECTION_BY_MONTH',
};

export function graph(state = initialState, action) {
	const graphData = {
		labels: [],
		datasets: [],
	};
	let yearNumber;
	let monthName;
	switch (action.type) {
	case GraphActionTypes.FulfillDataObject:
		return {
			...state,
			initialObject: action.data.generated,
			months: action.data.months,
			years: action.data.years,
		};
	case GraphActionTypes.SetAvgByYears:
		graphData.labels = [];
		graphData.labels.push('years');
		Object.keys(state.initialObject).forEach((year) => {
			let sum = 0;
			Object.keys(state.initialObject[year].months).forEach((month) => {
				sum += state.initialObject[year].months[month].reduce((accumulator, currentValue) => accumulator + currentValue);
			});
			graphData.datasets.push({
				label: year,
				data: [sum],
				backgroundColor: getRandomColor()
			});
		});
		return {
			...state,
			graphData: graphData,
		};
	case GraphActionTypes.SetAvgByMonths:
		yearNumber = action.year;
		graphData.labels = [yearNumber];
		Object.keys(state.initialObject[yearNumber].months).forEach((month) => {
			graphData.datasets.push({
				label: month,
				data: [state.initialObject[yearNumber].months[month].reduce((accumulator, currentValue) => accumulator + currentValue)],
				backgroundColor: getRandomColor()
			});
		});
		return {
			...state,
			graphData: graphData,
		};
	case GraphActionTypes.SetSelectionByMonth:
		yearNumber = action.year;
		monthName = action.month;
		graphData.labels = [`${monthName} ${yearNumber}`];
		state.initialObject[yearNumber].months[monthName].forEach((value, index) => {
			graphData.datasets.push({
				label: index + 1,
				data: [value],
				backgroundColor: getRandomColor()
			});
		});
		return {
			...state,
			graphData: graphData,
		};
	default:
		return state;
	}
}
