import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { searchRecipeSlice } from '~/features/search-recipe';

const rootReducer = combineReducers({
    [searchRecipeSlice.name]: searchRecipeSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
});

declare global {
    type RootState = ReturnType<typeof rootReducer>;
    type AppDispatch = typeof store.dispatch;
    type AppStore = typeof store;
}
