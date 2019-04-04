import { createSelector } from 'reselect';

export const getMonths = createSelector((state) => state.graph.months, (months) => months);

export const getYears = createSelector((state) => state.graph.years, (years) => years);

export const getBarData = createSelector((state) => state.graph.graphData, (graphData) => graphData);
