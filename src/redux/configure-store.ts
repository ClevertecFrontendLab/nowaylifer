import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { listenerMiddleware } from './listener-middleware';
import { authSlice, authApi, authSlicePersistConfig } from './auth';
import { reviewsApi } from './reviews';
import { trainingApi } from './training';
import { catalogsApi } from './catalogs';

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
            ),
});

export const persistor = persistStore(store);
export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
