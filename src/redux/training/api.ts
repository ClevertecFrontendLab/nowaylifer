import { baseQueryBackend } from '@redux/base-query-backend';
import { EntityState } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { transformTrainingResponse } from './adapter';
import { EditTrainingDTO, CreateTrainingDTO, Training, Exercise } from './types';
import { trainingAdapter } from './adapter';

const prepareDTO = (dto: CreateTrainingDTO) => {
    dto.exercises = dto.exercises.map(({ _id, ...exercise }) => exercise) as Exercise[];
    return dto;
};

export const trainingApi = createApi({
    reducerPath: 'trainingApi',
    baseQuery: baseQueryBackend({ minDelay: 1000, prefixUrl: 'training' }),
    endpoints: (builder) => ({
        fetchTrainingList: builder.query<EntityState<Training, Training['_id']>, void>({
            query: () => '',
            transformResponse: transformTrainingResponse,
        }),
        createTraining: builder.mutation<Training, CreateTrainingDTO>({
            query: (dto) => ({
                url: '',
                method: 'POST',
                body: prepareDTO(dto),
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
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                try {
                    const { data: training } = await queryFulfilled;
                    dispatch(
                        trainingApi.util.updateQueryData(
                            'fetchTrainingList',
                            undefined,
                            (entityState) => {
                                trainingAdapter.updateOne(entityState, {
                                    id: training._id,
                                    changes: training,
                                });
                            },
                        ),
                    );
                } catch {
                    // ignore
                }
            },
        }),
    }),
});

export const {
    useLazyFetchTrainingListQuery,
    useFetchTrainingListQuery,
    useCreateTrainingMutation,
    useEditTrainingMutation,
} = trainingApi;

export const { useQueryState: useFetchTrainingListState } = trainingApi.endpoints.fetchTrainingList;
