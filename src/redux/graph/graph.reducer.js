const initialState = {
	initialObject: [],
	years: [],
	months: [],
	mode: 'YEARS',
	selectedYear: 2012,
	selectedMonth: 'January',
};

export const GraphActionTypes = {
	FulfillDataObject: 'FULFILL_DATA_OBJECT',
	SetAvgByYears: 'SET_AVG_BY_YEARS',
	SetAvgByMonths: 'SET_AVG_BY_MONTHS',
	SetSelectionByMonth: 'SET_SELECTION_BY_MONTH',
};

export const GraphModeTypes = {
	Years: 'YEARS',
	Months: 'MONTHS',
	Days: 'DAYS',
};

export function graph(state = initialState, action) {
	switch (action.type) {
	case GraphActionTypes.FulfillDataObject:
		return {
			...state,
			initialObject: action.data.generated,
			months: action.data.months,
			years: action.data.years,
		};
	case GraphActionTypes.SetAvgByYears:
		return {
			...state,
			mode: GraphModeTypes.Years,
		};
	case GraphActionTypes.SetAvgByMonths:
		return {
			...state,
			selectedYear: action.year,
			mode: GraphModeTypes.Months
		};
	case GraphActionTypes.SetSelectionByMonth:
		return {
			...state,
			selectedYear: action.year,
			selectedMonth: action.month,
			mode: GraphModeTypes.Days,
		};
	default:
		return state;
	}
}
