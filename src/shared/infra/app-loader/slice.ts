import { createSlice } from '@reduxjs/toolkit';

const defaultId = 'DEFAULT_SUBSCRIBER';

export const slice = createSlice({
    name: 'appLoader',
    initialState: {
        isRunning: false,
        subsribers: new Set(),
    },
    reducers: (create) => ({
        start: create.reducer<string | undefined>((state, action) => {
            state.subsribers.add(action.payload ?? defaultId);
            state.isRunning = true;
        }),
        stop: create.reducer<string | undefined>((state, action) => {
            state.subsribers.delete(action.payload ?? defaultId);
            state.isRunning = state.subsribers.size > 0;
        }),
        stopAll: create.reducer((state) => {
            state.subsribers.clear();
        }),
    }),
    selectors: {
        selectIsAppLoaderRunning: (state, id?: string) =>
            id ? state.subsribers.has(id) : state.isRunning,
    },
});

export const { start: startAppLoader, stop: stopAppLoader } = slice.actions;
export const { selectIsAppLoaderRunning } = slice.getSelectors(slice.selectSlice);
