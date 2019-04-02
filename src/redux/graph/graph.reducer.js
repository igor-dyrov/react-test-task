const initialState = {
	graphData: []
};

export const GraphActionTypes = {
	SetAvgByYears: 'SET_AVG_BY_YEARS',
	SetAvgByMonths: 'SET_AVG_BY_MONTHS',
	SetSortByMonth: 'SET_SORT_BY_MONTH',
};

export function graph(state = initialState, action) {
	switch (action.type) {
	case GraphActionTypes.SetAvgByYears:
		return {
			...state,
			graphData: []
		};
	default:
		return state;
	}
}

function getRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
