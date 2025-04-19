import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchRecipeState {
    search: string;
}

const initialState: SearchRecipeState = {
    search: '',
};

export const slice = createSlice({
    name: 'searchRecipe',
    initialState,
    reducers: {
        setRecipeSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload.trim().toLowerCase();
        },
        clearRecipeSearch: (state) => {
            state.search = '';
        },
    },
    selectors: {
        selectRecipeSearch: (state) => state.search,
    },
});

export const { clearRecipeSearch, setRecipeSearch } = slice.actions;
export const { selectRecipeSearch } = slice.getSelectors(slice.selectSlice);
