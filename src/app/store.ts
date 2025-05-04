import {
    combineReducers,
    configureStore,
    SerializableStateInvariantMiddlewareOptions,
} from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

import { filterRecipeSlice } from '~/features/filter-recipe';
import { searchRecipeSlice } from '~/features/search-recipe';
import { apiSlice } from '~/shared/api';
import { listenerMiddleware } from '~/shared/store';
import { appLoaderSlice } from '~/widgets/app-loader';

enableMapSet();

const rootReducer = combineReducers({
    [searchRecipeSlice.name]: searchRecipeSlice.reducer,
    [filterRecipeSlice.name]: filterRecipeSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [appLoaderSlice.name]: appLoaderSlice.reducer,
});

export const store = configureStore({
    devTools: true,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredPaths: ['appLoader.subsribers'],
            } satisfies SerializableStateInvariantMiddlewareOptions,
        })
            .prepend(listenerMiddleware.middleware)
            .concat(apiSlice.middleware),
});

declare global {
    type RootState = ReturnType<typeof rootReducer>;
    type AppDispatch = typeof store.dispatch;
    type AppStore = typeof store;
}
