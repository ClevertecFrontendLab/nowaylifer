import {
    createApi,
    fetchBaseQuery,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    QueryReturnValue,
} from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from '../config';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    endpoints: () => ({}),
});

export type TypedQueryReturnValue<T, E = FetchBaseQueryError, M = FetchBaseQueryMeta> = Promise<
    QueryReturnValue<T, E, M>
>;
