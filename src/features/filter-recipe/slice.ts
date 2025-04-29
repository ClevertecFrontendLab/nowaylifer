import { createSelector, createSlice } from '@reduxjs/toolkit';

import { filterConfig } from './filter-config';
import { Filter, FilterGroup, FilterType } from './types';

export interface FilterRecipeState {
    filters: { [Type in FilterType]: { type: Type; current: Filter[]; applied: Filter[] } };
}

export const FILTER_TYPES = Object.keys(filterConfig) as FilterType[];

const emptyFilterArray: Filter[] = [];

export const slice = createSlice({
    name: 'filterRecipe',
    initialState: (): FilterRecipeState => ({
        filters: FILTER_TYPES.reduce(
            (acc, next) => ({
                ...acc,
                [next]: { type: next, current: emptyFilterArray, applied: emptyFilterArray },
            }),
            {} as FilterRecipeState['filters'],
        ),
    }),
    reducers: (create) => ({
        applyFilter: create.reducer<FilterType>((state, action) => {
            const group = state.filters[action.payload];
            group.applied = group.current;
        }),
        applyFilters: create.reducer((state) => {
            FILTER_TYPES.forEach((t) => slice.caseReducers.applyFilter(state, applyFilter(t)));
        }),
        setFilter: create.reducer<FilterGroup>((state, action) => {
            const { type, filters } = action.payload;
            state.filters[type].current = filters;
        }),
        addFilter: create.reducer<Filter>((state, action) => {
            const filter = action.payload;
            state.filters[filter.type].current.push(filter);
        }),
        removeFilter: create.reducer<Filter>((state, action) => {
            const filter = action.payload;
            const group = state.filters[filter.type];
            group.current = group.current.filter((f) => f.value !== filter.value);
        }),
        toggleFilter: create.reducer<{ filter: Filter; flag: boolean }>((state, action) => {
            const { filter, flag } = action.payload;
            const key = flag ? 'addFilter' : 'removeFilter';
            slice.caseReducers[key](state, slice.actions[key](filter));
        }),
        resetFilter: create.reducer<FilterType>((state, action) => {
            state.filters[action.payload].current = [];
        }),
        resetFilters: create.reducer((state) => {
            FILTER_TYPES.forEach((t) => slice.caseReducers.resetFilter(state, resetFilter(t)));
        }),
    }),
    selectors: {
        selectHasAnyFilter: (state) => FILTER_TYPES.some((t) => state.filters[t].current.length),
        selectHasFilter: (state, type: FilterType) => !!state.filters[type].current.length,
        selectHasAppliedFilter: (state, type: FilterType) => !!state.filters[type].applied.length,
        selectIsFiltersDirty: (state) =>
            FILTER_TYPES.some((t) => {
                const group = state.filters[t];
                return group.applied !== group.current && group.applied.length > 0;
            }),
        selectFilter: (state, filter: FilterType): Filter[] => state.filters[filter].current,
        selectAppliedFilter: (state, type: FilterType): Filter[] => state.filters[type].applied,
        selectFilters: createSelector(
            FILTER_TYPES.map((t) => (state: FilterRecipeState) => state.filters[t].current),
            (...groups): Filter[] => groups.flat(),
        ),
        selectAppliedFilterGroups: createSelector(
            FILTER_TYPES.map((t) => (state: FilterRecipeState) => state.filters[t].applied),
            (...groups): FilterGroup[] =>
                groups
                    .flatMap((filters, i) => ({ type: FILTER_TYPES[i], filters }))
                    .filter((group) => group.filters.length),
        ),
    },
});

export const {
    setFilter,
    addFilter,
    removeFilter,
    applyFilter,
    applyFilters,
    resetFilter,
    resetFilters,
    toggleFilter,
} = slice.actions;

export const {
    selectFilter,
    selectHasAppliedFilter,
    selectHasFilter,
    selectIsFiltersDirty,
    selectFilters,
    selectAppliedFilter,
    selectAppliedFilterGroups,
    selectHasAnyFilter,
} = slice.getSelectors(slice.selectSlice);
