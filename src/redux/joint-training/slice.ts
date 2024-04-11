import { createSlice } from '@reduxjs/toolkit';

import { jointTrainingApi } from '.';

type State = {
    unreadInvites: number;
    invitesLength: number;
};
const initialState: State = {
    invitesLength: 0,
    unreadInvites: 0,
};

export const jointTrainingSlice = createSlice({
    name: 'jointTrainingSlice',
    initialState,
    reducers: {
        readAllInvites(state) {
            state.unreadInvites = 0;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            jointTrainingApi.endpoints.fetchInvites.matchFulfilled,
            (state, action) => {
                if (action.payload.length > state.invitesLength) {
                    state.unreadInvites = action.payload.length - state.invitesLength;
                    state.invitesLength = action.payload.length;
                }

                state.invitesLength = action.payload.length;
            },
        );
    },
});

export const { readAllInvites } = jointTrainingSlice.actions;
