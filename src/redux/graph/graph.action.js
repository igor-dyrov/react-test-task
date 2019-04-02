import { GraphActionTypes } from './graph.reducer.js';

export function initDataObject(data) {
	return {
		type: GraphActionTypes.FulfillDataObject,
		data: data,
	};
}

export function sortDataByYears() {
	return {
		type: GraphActionTypes.SetAvgByYears
	};
}
