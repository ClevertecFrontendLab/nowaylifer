import { createAction, createSlice } from '@reduxjs/toolkit';

export interface SessionState {
    token: string | null;
}

const initialState: SessionState = {
    token: null,
};

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
    },
});

export const loggedOut = createAction('session/loggedOut');

export const logout = () => (dispatch: AppDispatch) => {
    dispatch(setToken(null));
    dispatch(loggedOut());
};

export const { setToken } = slice.actions;

export const { selectToken } = slice.getSelectors(slice.selectSlice);
