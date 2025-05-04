import { createSlice } from '@reduxjs/toolkit';

import { SEARCH_WORD_MIN_LENGTH } from './config';

export interface SearchRecipeState {
    currentSearchString: string;
    appliedSearchString: string;
    isLastSearchSuccess: boolean | null;
    isSearchEnabledRequirementChecks: {
        searchStringLength: boolean;
        forceEnabled: boolean;
    };
}

const initialState: SearchRecipeState = {
    currentSearchString: '',
    appliedSearchString: '',
    isLastSearchSuccess: null,
    isSearchEnabledRequirementChecks: {
        searchStringLength: false,
        forceEnabled: false,
    },
};

export const slice = createSlice({
    name: 'searchRecipe',
    initialState,
    reducers: (create) => ({
        setIsSearchForceEnabled: create.reducer<boolean>((state, action) => {
            state.isSearchEnabledRequirementChecks.forceEnabled = action.payload;
        }),
        applySearchString: create.reducer((state) => {
            state.appliedSearchString = state.currentSearchString;
        }),
        setSearchString: create.reducer<string>((state, action) => {
            const searchString = action.payload.trim().toLocaleLowerCase();
            state.currentSearchString = searchString;
            state.isSearchEnabledRequirementChecks.searchStringLength =
                searchString.length >= SEARCH_WORD_MIN_LENGTH;
        }),
        setIsLastSearchSuccess: create.reducer<boolean | null>((state, action) => {
            state.isLastSearchSuccess = action.payload;
        }),
    }),
    selectors: {
        selectSearchString: (state) => state.currentSearchString,
        selectAppliedSearchString: (state) => state.appliedSearchString,
        selectIsSearchEnabled: (state) =>
            state.isSearchEnabledRequirementChecks.forceEnabled ||
            state.isSearchEnabledRequirementChecks.searchStringLength,
        selectIsLastSearchSuccess: (state) => state.isLastSearchSuccess,
    },
});

export const {
    setSearchString,
    setIsLastSearchSuccess,
    applySearchString,
    setIsSearchForceEnabled,
} = slice.actions;
export const {
    selectSearchString,
    selectIsLastSearchSuccess,
    selectAppliedSearchString,
    selectIsSearchEnabled,
} = slice.getSelectors(slice.selectSlice);
