import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterRecipeState {
    excludedAllergens: ReadonlyArray<{ label: string; value: string }>;
}

const initialState: FilterRecipeState = {
    excludedAllergens: [],
};

export const slice = createSlice({
    name: 'filterRecipe',
    initialState,
    reducers: {
        setExcludedAllergens(state, action: PayloadAction<FilterRecipeState['excludedAllergens']>) {
            return { ...state, excludedAllergens: action.payload };
        },
        clearExcludedAllergens(state) {
            state.excludedAllergens = [];
        },
    },
    selectors: {
        selectExcludedAllergens: (state) => state.excludedAllergens,
        selectRecipeFilters: (state) => state,
    },
});

export const { setExcludedAllergens, clearExcludedAllergens } = slice.actions;
export const { selectExcludedAllergens, selectRecipeFilters } = slice.getSelectors(
    slice.selectSlice,
);
