import {
    createApi,
    fetchBaseQuery,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    QueryReturnValue,
} from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from '../config';
import { errorLogger } from './error-logger';

const baseQuery = errorLogger(fetchBaseQuery({ baseUrl: API_BASE_URL }));

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: () => ({}),
});

export type TypedQueryReturnValue<T, E = FetchBaseQueryError, M = FetchBaseQueryMeta> = Promise<
    QueryReturnValue<T, E, M>
>;
