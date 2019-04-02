import { GraphActionTypes } from './graph.reducer.js';

export function sortDataByYears() {
	return {
		type: GraphActionTypes.SetAvgByYears
	};
}
