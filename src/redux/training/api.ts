import { baseQueryBackend } from '@redux/base-query-backend';
import { EntityState } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { transformTrainingResponse } from './adapter';
import { ChangeTrainingDTO, CreateTrainingDTO, Training } from './types';

export const trainingApi = createApi({
    reducerPath: 'trainingApi',
    baseQuery: baseQueryBackend({ minDelay: 0, prefixUrl: 'training' }),
    endpoints: (builder) => ({
        fetchTrainingList: builder.query<EntityState<Training, Training['_id']>, void>({
            query: () => '',
            transformResponse: transformTrainingResponse,
        }),
        createTraining: builder.mutation<Training, CreateTrainingDTO>({
            query: (dto) => ({
                url: '',
                method: 'POST',
                body: dto,
            }),
        }),
        changeTraining: builder.mutation<
            Training,
            { id: Training['_id']; training: ChangeTrainingDTO }
        >({
            query: ({ id, training: dto }) => ({
                url: id,
                method: 'PUT',
                body: dto,
            }),
        }),
        deleteTraining: builder.mutation<void, Training['_id']>({
            query: (id) => ({
                url: id,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useFetchTrainingListQuery,
    useLazyFetchTrainingListQuery,
    useCreateTrainingMutation,
    useChangeTrainingMutation,
    useDeleteTrainingMutation,
} = trainingApi;

export const { useQueryState: useFetchTrainingListState } = trainingApi.endpoints.fetchTrainingList;
