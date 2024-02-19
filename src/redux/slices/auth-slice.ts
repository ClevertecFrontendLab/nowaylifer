import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

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
