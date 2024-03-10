import { baseQueryBackend } from '@redux/base-query-backend';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ChangeTrainingDTO, CreateTrainingDTO, Training } from './types';

export const trainingApi = createApi({
    reducerPath: 'trainingApi',
    baseQuery: baseQueryBackend({ minDelay: 1000, prefixUrl: 'training' }),
    endpoints: (builder) => ({
        fetchTraining: builder.query<Training[], void>({
            query: () => '/',
        }),
        createTraining: builder.mutation<Training, CreateTrainingDTO>({
            query: (dto) => ({
                url: '/',
                method: 'POST',
                body: dto,
            }),
        }),
        changeTraining: builder.mutation<
            Training,
            { id: Training['_id']; training: ChangeTrainingDTO }
        >({
            query: ({ id, training: dto }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: dto,
            }),
        }),
        deleteTraining: builder.mutation<void, Training['_id']>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useFetchTrainingQuery,
    useCreateTrainingMutation,
    useChangeTrainingMutation,
    useDeleteTrainingMutation,
} = trainingApi;
