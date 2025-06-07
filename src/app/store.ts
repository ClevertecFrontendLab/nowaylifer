import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { filterRecipeSlice } from '~/features/filter-recipe';
import { searchRecipeSlice } from '~/features/search-recipe';
import { apiSlice } from '~/shared/api';
import { appLoaderSlice } from '~/shared/infra/app-loader';
import { errorLoggerSlice } from '~/shared/infra/error-logger';
import { modalsSlice } from '~/shared/infra/modals-manager';
import { sessionSlice } from '~/shared/session';
import { listenerMiddleware } from '~/shared/store';

const rootReducer = combineReducers({
    [searchRecipeSlice.name]: searchRecipeSlice.reducer,
    [filterRecipeSlice.name]: filterRecipeSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [appLoaderSlice.name]: appLoaderSlice.reducer,
    [sessionSlice.name]: sessionSlice.reducer,
    [errorLoggerSlice.name]: errorLoggerSlice.reducer,
    [modalsSlice.name]: modalsSlice.reducer,
});

export const store = configureStore({
    devTools: true,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(apiSlice.middleware),
});

declare global {
    type RootState = ReturnType<typeof rootReducer>;
    type AppDispatch = typeof store.dispatch;
    type AppStore = typeof store;
}
