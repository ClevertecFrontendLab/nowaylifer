import { baseQueryBackend } from '@redux/base-query-backend';
import { EntityState } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';

import { transformTariffsResponse } from './tariffs.adapter';
import { transformTrainingCatalogResponse } from './training-type.adapter';
import { Tariff, TrainingType, UserJointTraining } from './types';

export const catalogsApi = createApi({
    reducerPath: 'catalogsApi',
    baseQuery: baseQueryBackend({ prefixUrl: 'catalogs', minDelay: 500 }),
    endpoints: (builder) => ({
        fetchTrainingCatalog: builder.query<EntityState<TrainingType, TrainingType['name']>, void>({
            query: () => '/training-list',
            transformResponse: transformTrainingCatalogResponse,
        }),
        fetchTariffs: builder.query<EntityState<Tariff, Tariff['_id']>, void>({
            query: () => '/tariff-list',
            transformResponse: transformTariffsResponse,
        }),
        fetchUserJointTrainingList: builder.query<UserJointTraining[], TrainingType | void>({
            query: (trainingType) => ({
                url: '/user-joint-training-list',
                params: trainingType ? { trainingType: trainingType.key } : undefined,
            }),
        }),
    }),
});

export const {
    useFetchTrainingCatalogQuery,
    useLazyFetchTrainingCatalogQuery,
    useFetchTariffsQuery,
    useFetchUserJointTrainingListQuery,
    useLazyFetchUserJointTrainingListQuery,
} = catalogsApi;

export const { useQueryState: useFetchTrainingCatalogState } =
    catalogsApi.endpoints.fetchTrainingCatalog;
