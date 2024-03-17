import { baseQueryBackend } from '@redux/base-query-backend';
import { EntityState } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { transformTrainingResponse } from './adapter';
import { EditTrainingDTO, CreateTrainingDTO, Training } from './types';
import { trainingAdapter } from './adapter';

export const trainingApi = createApi({
    reducerPath: 'trainingApi',
    baseQuery: baseQueryBackend({ prefixUrl: 'training' }),
    tagTypes: ['TRAININGS'],
    endpoints: (builder) => ({
        fetchTrainingList: builder.query<EntityState<Training, Training['_id']>, void>({
            query: () => '',
            transformResponse: transformTrainingResponse,
            // extraOptions: { minDelay: 1000 },
        }),
        createTraining: builder.mutation<Training, CreateTrainingDTO>({
            query: (dto) => ({
                url: '',
                method: 'POST',
                body: dto,
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                try {
                    const { data: training } = await queryFulfilled;
                    dispatch(
                        trainingApi.util.updateQueryData(
                            'fetchTrainingList',
                            undefined,
                            (entityState) => {
                                trainingAdapter.addOne(entityState, training);
                            },
                        ),
                    );
                } catch {
                    // ignore
                }
            },
        }),
        editTraining: builder.mutation<
            Training,
            { id: Training['_id']; training: EditTrainingDTO }
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
    useEditTrainingMutation,
    useDeleteTrainingMutation,
} = trainingApi;

export const { useQueryState: useFetchTrainingListState } = trainingApi.endpoints.fetchTrainingList;
