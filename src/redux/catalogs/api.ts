import { baseQueryBackend } from '@redux/base-query-backend';
import { createApi } from '@reduxjs/toolkit/query/react';
import { TrainingType, TrainingTypeDto } from './types';
import { mapTrainingTypeDto } from './map-training-type-dto';

export const catalogsApi = createApi({
    reducerPath: 'catalogsApi',
    baseQuery: baseQueryBackend({ prefixUrl: 'catalogs', minDelay: 0 }),
    endpoints: (builder) => ({
        fetchTrainingCatalog: builder.query<TrainingType[], void>({
            query: () => '/training-list',
            transformResponse: (data: TrainingTypeDto[]) => data.map(mapTrainingTypeDto),
        }),
    }),
});

export const { useFetchTrainingCatalogQuery, useLazyFetchTrainingCatalogQuery } = catalogsApi;
