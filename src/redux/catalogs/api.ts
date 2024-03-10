import { baseQueryBackend } from '@redux/base-query-backend';
import { createApi } from '@reduxjs/toolkit/query/react';
import { TrainingListItem } from './types';

export const catalogsApi = createApi({
    reducerPath: 'catalogsApi',
    baseQuery: baseQueryBackend({ prefixUrl: 'catalogs' }),
    endpoints: (builder) => ({
        fetchTrainingList: builder.query<TrainingListItem[], void>({
            query: () => '/training-list',
        }),
    }),
});

export const { useFetchTrainingListQuery } = catalogsApi;
