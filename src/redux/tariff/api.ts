import { baseQueryBackend } from '@redux/base-query-backend';
import { createApi } from '@reduxjs/toolkit/query/react';

import { RequestBuyTariff } from './types';

export const tariffApi = createApi({
    reducerPath: 'tariffApi',
    baseQuery: baseQueryBackend({ prefixUrl: 'tariff', minDelay: 1000 }),
    endpoints: (builder) => ({
        requestBuyTariff: builder.mutation<void, RequestBuyTariff>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useRequestBuyTariffMutation } = tariffApi;
