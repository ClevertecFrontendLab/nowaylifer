import type { Location } from 'react-router-dom';
import { REHYDRATE } from 'redux-persist';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { cleanMutationRetry, untypedMutationRetried } from './actions';
import { sliceName } from './config';
import type { ChangePasswordPayload, UserCredentials } from './types';

export type RetryField<T = unknown> = { shouldRetry: false } | { shouldRetry: true; data: T };

export type AuthSliceState = {
    _persistedToken: string | null;
    token: string | null;
    authLoading: boolean;
    authFrom: Location | null;
    rememberGoogleAuth: boolean;
    retryRegister: RetryField<UserCredentials>;
    retryCheckEmail: RetryField<UserCredentials['email']>;
    retryChangePassword: RetryField<ChangePasswordPayload>;
    emailToConfirm: string | null;
};

const initialState: AuthSliceState = {
    _persistedToken: null,
    token: null,
    authLoading: false,
    authFrom: null,
    rememberGoogleAuth: false,
    emailToConfirm: null,
    retryRegister: { shouldRetry: false },
    retryCheckEmail: { shouldRetry: false },
    retryChangePassword: { shouldRetry: false },
};

export const authSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        setToken(state, { payload }: PayloadAction<{ token: string; remember: boolean } | null>) {
            if (!payload) {
                state.token = null;
                state._persistedToken = null;

                return;
            }

            state.token = payload.token;

            if (payload.remember) {
                state._persistedToken = payload.token;
            }
        },
        setRememberGoogleAuth(state, action: PayloadAction<boolean>) {
            state.rememberGoogleAuth = action.payload;
        },
        setAuthFrom(state, action: PayloadAction<Location | null>) {
            state.authFrom = action.payload;
        },
        setAuthLoading(state, action: PayloadAction<boolean>) {
            state.authLoading = action.payload;
        },
        setEmailToConfirm(state, action: PayloadAction<string | null>) {
            state.emailToConfirm = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(REHYDRATE, (state, action) => {
                const { key, payload } = action as PayloadAction<AuthSliceState | undefined> & {
                    key: string;
                };

                if (key === sliceName && payload?._persistedToken) {
                    state.token = payload._persistedToken;
                    state._persistedToken = payload._persistedToken;
                }
            })
            .addCase(untypedMutationRetried, (state, { payload }) => ({
                ...state,
                [payload.retryField]: { shouldRetry: true, data: payload.data },
            }))
            .addCase(cleanMutationRetry, (state, action) => {
                state[action.payload] = { shouldRetry: false };
            });
    },
});

export const { setToken, setAuthFrom, setAuthLoading, setEmailToConfirm, setRememberGoogleAuth } =
    authSlice.actions;
