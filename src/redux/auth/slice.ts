import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Location } from 'react-router-dom';
import { REHYDRATE } from 'redux-persist';
import type { ResultStatus, UserCredentials } from 'src/types';

export type AuthSliceState = {
    token: string | null;
    _persistedToken: string | null;
    authFrom: Location | null;
    retryRegister: UserCredentials | null;
    retryCheckEmail: UserCredentials['email'] | null;
};

const initialState: AuthSliceState = {
    _persistedToken: null,
    token: null,
    authFrom: null,
    retryRegister: null,
    retryCheckEmail: null,
};

const sliceName = 'auth';

export const authSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        setToken(store, action: PayloadAction<{ token: string; remember: boolean }>) {
            store.token = action.payload.token;
            if (action.payload.remember) {
                store._persistedToken = action.payload.token;
            }
        },
        setAuthFrom(store, action: PayloadAction<Location | null>) {
            store.authFrom = action.payload;
        },
        registerRetried(store, action: PayloadAction<UserCredentials>) {
            store.retryRegister = action.payload;
        },
        cleanRegisterRetry(store) {
            store.retryRegister = null;
        },
        checkEmailRetried(store, action: PayloadAction<UserCredentials['email']>) {
            store.retryCheckEmail = action.payload;
        },
        cleanCheckEmailRetry(store) {
            store.retryCheckEmail = null;
        },
    },
    extraReducers(builder) {
        builder.addCase(REHYDRATE, (state, action) => {
            const { key, payload } = action as PayloadAction<AuthSliceState | undefined> & {
                key: string;
            };

            if (key === sliceName && payload?._persistedToken) {
                state.token = state._persistedToken = payload._persistedToken;
            }
        });
    },
});

export const redirectFromAuthResult = createAction<ResultStatus>(
    `${sliceName}/redirectFromAuthResult`,
);

export const {
    setToken,
    setAuthFrom,
    registerRetried,
    checkEmailRetried,
    cleanRegisterRetry,
    cleanCheckEmailRetry,
} = authSlice.actions;
