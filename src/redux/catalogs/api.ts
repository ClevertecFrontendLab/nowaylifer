import { baseQueryBackend } from '@redux/base-query-backend';
import { createApi } from '@reduxjs/toolkit/query/react';
import { TrainingCatalogItem } from './types';

export const catalogsApi = createApi({
    reducerPath: 'catalogsApi',
    baseQuery: baseQueryBackend({ prefixUrl: 'catalogs', minDelay: 0 }),
    endpoints: (builder) => ({
        fetchTrainingCatalog: builder.query<TrainingCatalogItem[], void>({
            query: () => '/training-list',
        }),
    }),
});

export const { useFetchTrainingCatalogQuery, useLazyFetchTrainingCatalogQuery } = catalogsApi;
