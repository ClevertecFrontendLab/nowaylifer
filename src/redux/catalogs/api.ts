import { baseQueryBackend } from '@redux/base-query-backend';
import { EntityState } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { transformTrainingCatalogResponse } from './training-type.adapter';
import { TrainingType } from './types';

export const catalogsApi = createApi({
    reducerPath: 'catalogsApi',
    baseQuery: baseQueryBackend({ prefixUrl: 'catalogs', minDelay: 0 }),
    endpoints: (builder) => ({
        fetchTrainingCatalog: builder.query<EntityState<TrainingType, TrainingType['name']>, void>({
            query: () => '/training-list',
            transformResponse: transformTrainingCatalogResponse,
        }),
    }),
});

export const { useFetchTrainingCatalogQuery, useLazyFetchTrainingCatalogQuery } = catalogsApi;
