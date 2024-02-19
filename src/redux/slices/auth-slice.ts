import { REHYDRATE } from 'redux-persist';
import { push, replace } from 'redux-first-history';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ResultStatus } from '@pages/auth-result-page/result-config';
import type { AppDispatch, GetState } from '@redux/configure-store';
import type { LocationWithState } from '@hooks/use-app-location';
import { Path } from '@router/paths';

export type AuthSliceState = {
    token: string | null;
    _persistedToken: string | null;
};

const initialState: AuthSliceState = { token: null, _persistedToken: null };

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

export const { setToken } = authSlice.actions;

export const redirectAfterLogin = () => (dispatch: AppDispatch, getState: GetState) => {
    const location = getState().router.location as LocationWithState;
    const from = location.state?.from;
    dispatch(replace(from ?? Path.Main));
};

export const redirectToAuthResult =
    (status: ResultStatus, state?: Record<string, unknown>) =>
    (dispatch: AppDispatch, getState: GetState) => {
        dispatch(push(Path.Result + `/${status}`, { from: getState().router.location, ...state }));
    };
