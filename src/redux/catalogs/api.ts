import { baseQueryBackend } from '@redux/base-query-backend';
import { EntityState } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';

import { transformTariffsResponse } from './tariffs.adapter';
import { transformTrainingCatalogResponse } from './training-type.adapter';
import { Tariff, TrainingType } from './types';

export const catalogsApi = createApi({
    reducerPath: 'catalogsApi',
    baseQuery: baseQueryBackend({ prefixUrl: 'catalogs', minDelay: 1000 }),
    endpoints: (builder) => ({
        fetchTrainingCatalog: builder.query<EntityState<TrainingType, TrainingType['name']>, void>({
            query: () => '/training-list',
            transformResponse: transformTrainingCatalogResponse,
        }),
        fetchTariffs: builder.query<EntityState<Tariff, Tariff['_id']>, void>({
            query: () => '/tariff-list',
            transformResponse: transformTariffsResponse,
        }),
    }),
});

export const {
    useFetchTrainingCatalogQuery,
    useLazyFetchTrainingCatalogQuery,
    useFetchTariffsQuery,
} = catalogsApi;

export const { useQueryState: useFetchTrainingCatalogState } =
    catalogsApi.endpoints.fetchTrainingCatalog;
