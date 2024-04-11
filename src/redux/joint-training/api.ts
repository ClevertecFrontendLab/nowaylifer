import { baseQueryBackend } from '@redux/base-query-backend';
import { catalogsApi } from '@redux/catalogs';
import { createApi } from '@reduxjs/toolkit/query/react';

import { SendInviteDto, TrainingInvite, TrainingInviteForMe } from './types';

export const jointTrainingApi = createApi({
    reducerPath: 'jointTrainingApi',
    baseQuery: baseQueryBackend({ minDelay: 500 }),
    tagTypes: ['INVITES'],
    endpoints: (builder) => ({
        fetchInvites: builder.query<TrainingInviteForMe[], void>({
            query: () => '/invite',
            providesTags: ['INVITES'],
        }),
        sendInvite: builder.mutation<TrainingInvite[], SendInviteDto>({
            query: (dto) => ({
                url: '/invite',
                method: 'POST',
                body: dto,
            }),
            onQueryStarted: async (_, api) => {
                await api.queryFulfilled;
                api.dispatch(catalogsApi.util.invalidateTags(['JOINT_TRAINING_LIST']));
            },
        }),
        sendResponse: builder.mutation<TrainingInvite, { id: string; status: string }>({
            query: (dto) => ({
                url: '/invite',
                method: 'PUT',
                body: dto,
            }),
            invalidatesTags: ['INVITES'],
        }),
        cancelInvite: builder.mutation<void, string>({
            query: (inviteId) => ({
                url: `/invite/${inviteId}`,
                method: 'DELETE',
                invalidateTags: ['INVITES'],
            }),
            onQueryStarted: async (_, api) => {
                await api.queryFulfilled;
                api.dispatch(catalogsApi.util.invalidateTags(['MY_TRAINING_PALS']));
            },
        }),
    }),
});

export const {
    useFetchInvitesQuery,
    useSendInviteMutation,
    useSendResponseMutation,
    useCancelInviteMutation,
} = jointTrainingApi;
