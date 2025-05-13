import { createSlice } from '@reduxjs/toolkit';

export interface ModalsState {
    isModalOpen: boolean;
}

const initialState: ModalsState = {
    isModalOpen: false,
};

export const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: (create) => ({
        setIsModalOpen: create.reducer<boolean>((state, action) => {
            state.isModalOpen = action.payload;
        }),
    }),
    selectors: {
        selectIsModalOpen: (state) => state.isModalOpen,
    },
});

export const { setIsModalOpen } = modalsSlice.actions;
export const { selectIsModalOpen } = modalsSlice.getSelectors(modalsSlice.selectSlice);
