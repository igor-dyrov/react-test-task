import { createSelector } from 'reselect';

import { GraphModeTypes } from '../../redux/graph/graph.reducer.js';

export const yearSelectorIsVisible = createSelector([
	(state) => state.mode,
], (mode) => {
	return mode !== GraphModeTypes.Years;
});

export const monthSelectorIsVisible = createSelector([
	(state) => state.mode,
], (mode) => mode === GraphModeTypes.Days);
