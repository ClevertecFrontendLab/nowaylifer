import { createSelector, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { categoryApi } from '~/entities/category';
import { categoriesHydrated } from '~/entities/category/lib/init-categories.middleware';

import { defaultFilterOptions } from './filter-options';
import {
    Filter,
    FILTER_TYPES,
    FilterGroup,
    FilterOption,
    FiltersByGroups,
    FilterType,
} from './types';

export interface FilterRecipeState {
    isAppliedFromDrawer: boolean;
    filters: {
        [Type in FilterType]: {
            type: Type;
            current: Filter[];
            applied: Filter[];
            options: FilterOption[];
        };
    };
}

const emptyFilterArray: Filter[] = [];

export const slice = createSlice({
    name: 'filterRecipe',
    initialState: (): FilterRecipeState => ({
        isAppliedFromDrawer: false,
        filters: FILTER_TYPES.reduce(
            (acc, type) => ({
                ...acc,
                [type]: {
                    type,
                    current: emptyFilterArray,
                    applied: emptyFilterArray,
                    options: defaultFilterOptions[type].map((o) => ({ ...o, type })),
                },
            }),
            {} as FilterRecipeState['filters'],
        ),
    }),
    reducers: (create) => ({
        setIsAppliedFromDrawer: create.reducer<boolean>((state, action) => {
            state.isAppliedFromDrawer = action.payload;
        }),
        setFilterOptions: create.reducer<{ type: FilterType; options: FilterOption[] }>(
            (state, action) => {
                state.filters[action.payload.type].options = action.payload.options;
            },
        ),
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
        restoreFilter: create.reducer<FilterType>((state, action) => {
            const group = state.filters[action.payload];
            group.current = group.applied;
        }),
        restoreFilters: create.reducer((state) => {
            FILTER_TYPES.forEach((t) => slice.caseReducers.restoreFilter(state, restoreFilter(t)));
        }),
    }),
    extraReducers: (build) => {
        build.addMatcher(
            isAnyOf(categoryApi.endpoints.categories.matchFulfilled, categoriesHydrated.match),
            (state, action) => {
                const options = action.payload.rootCategories.map<FilterOption>((category) => ({
                    type: 'categories',
                    label: category.title,
                    value: category._id,
                }));
                slice.caseReducers.setFilterOptions(
                    state,
                    slice.actions.setFilterOptions({ type: 'categories', options }),
                );
            },
        );
    },
    selectors: {
        selectIsAppliedFromDrawer: (state) => state.isAppliedFromDrawer,
        selectFilterOptions: (state, type: FilterType) => state.filters[type].options,
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
        selectAppliedFiltersByGroup: createSelector(
            FILTER_TYPES.map((t) => (state: FilterRecipeState) => state.filters[t].applied),
            (...groups): FiltersByGroups =>
                groups.reduce(
                    (acc, filters, idx) =>
                        filters.length ? { ...acc, [FILTER_TYPES[idx]]: filters } : acc,
                    {},
                ),
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
    setIsAppliedFromDrawer,
    resetFilters,
    restoreFilter,
    restoreFilters,
    toggleFilter,
} = slice.actions;

export const {
    selectIsAppliedFromDrawer,
    selectFilterOptions,
    selectAppliedFiltersByGroup,
    selectFilter,
    selectHasAppliedFilter,
    selectHasFilter,
    selectIsFiltersDirty,
    selectFilters,
    selectAppliedFilter,
    selectHasAnyFilter,
} = slice.getSelectors(slice.selectSlice);
