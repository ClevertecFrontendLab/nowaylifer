import { baseQueryBackend } from '@redux/base-query-backend';
import { createApi } from '@reduxjs/toolkit/query/react';
import { TrainingType } from './types';

export const catalogsApi = createApi({
    reducerPath: 'catalogsApi',
    baseQuery: baseQueryBackend({ prefixUrl: 'catalogs', minDelay: 0 }),
    endpoints: (builder) => ({
        fetchTrainingCatalog: builder.query<TrainingType[], void>({
            query: () => '/training-list',
        }),
    }),
});

export const { useFetchTrainingCatalogQuery, useLazyFetchTrainingCatalogQuery } = catalogsApi;
