import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'appLoader',
    initialState: {
        count: 0,
        overlayCount: 0,
    },
    reducers: (create) => ({
        startAppLoader: create.reducer<boolean>((state, { payload: withOverlay = true }) => {
            state.count++;
            state.overlayCount += withOverlay ? 1 : 0;
        }),
        stopAppLoader: create.reducer((state) => {
            state.count = Math.max(0, state.count - 1);
            state.overlayCount = Math.max(0, state.overlayCount - 1);
        }),
    }),
    selectors: {
        selectIsAppLoaderRunning: (state) => state.count > 0,
        selectIsAppLoaderOverlayEnabled: (state) => state.overlayCount > 0,
    },
});

export const { startAppLoader, stopAppLoader } = slice.actions;

export const { selectIsAppLoaderRunning, selectIsAppLoaderOverlayEnabled } = slice.getSelectors(
    slice.selectSlice,
);
