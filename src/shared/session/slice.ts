import { createAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

export interface SessionState {
    token: string | null;
}

const initialState: SessionState = {
    token: null,
};

export interface SessionData {
    login: string;
    userId: string;
}

export const slice = createSlice({
    name: 'session',
    initialState,
    reducers: (create) => ({
        setToken: create.reducer<string | null>((state, action) => {
            state.token = action.payload;
        }),
    }),
    selectors: {
        selectToken: (state) => state.token,
        selectIsAuthenticated: (state) => !!state.token,
        selectSessionData: createSelector(
            (state: SessionState) => state.token,
            (token) => {
                if (!token) return null;
                try {
                    return jwtDecode<SessionData>(token);
                } catch (error) {
                    console.error('Failed to decode token:', error);
                    return null;
                }
            },
        ),
    },
});

export const loggedOut = createAction('session/loggedOut');

export const logout = () => (dispatch: AppDispatch) => {
    dispatch(setToken(null));
    dispatch(loggedOut());
};

export const { setToken } = slice.actions;

export const { selectToken, selectIsAuthenticated, selectSessionData } = slice.getSelectors(
    slice.selectSlice,
);
