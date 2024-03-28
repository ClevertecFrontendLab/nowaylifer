import { createReduxHistoryContext } from 'redux-first-history';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';

import { authApi, authSlice, authSlicePersistConfig } from './auth';
import { catalogsApi } from './catalogs';
import { listenerMiddleware } from './listener-middleware';
import { reviewsApi } from './reviews';
import { tariffApi } from './tariff';
import { trainingApi } from './training';
import { userApi } from './user';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

const rootPersistConfig = {
    key: 'root',
    storage,
    whitelist: [],
};

const rootReducer = combineReducers({
    router: routerReducer,
    [authSlice.name]: persistReducer(authSlicePersistConfig, authSlice.reducer),
    [authApi.reducerPath]: authApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [catalogsApi.reducerPath]: catalogsApi.reducer,
    [trainingApi.reducerPath]: trainingApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [tariffApi.reducerPath]: tariffApi.reducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            .prepend(listenerMiddleware.middleware)
            .concat(
                routerMiddleware,
                authApi.middleware,
                reviewsApi.middleware,
                catalogsApi.middleware,
                trainingApi.middleware,
                userApi.middleware,
                tariffApi.middleware,
            ),
});

export const persistor = persistStore(store);
export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
