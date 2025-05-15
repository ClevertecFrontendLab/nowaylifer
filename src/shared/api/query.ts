import {
    createApi,
    fetchBaseQuery,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    QueryReturnValue,
} from '@reduxjs/toolkit/query/react';

import { withErrorLogger } from '~/shared/infra/error-logger';

import { API_BASE_URL } from '../config';
import { loggedOut, selectToken } from '../session/slice';
import { startAppListening } from '../store';
import { withRefreshToken } from './refresh-token';

const baseQuery = withErrorLogger(
    withRefreshToken(
        fetchBaseQuery({
            baseUrl: API_BASE_URL,
            credentials: 'include',
            prepareHeaders: (headers, { getState }) => {
                const token = selectToken(getState() as RootState);
                if (token) {
                    headers.set('authorization', `Bearer ${token}`);
                }
                return headers;
            },
        }),
    ),
);

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: () => ({}),
});

// abort all queries on logged out
startAppListening({
    actionCreator: loggedOut,
    effect: (_, { dispatch }) => {
        const queries = dispatch(apiSlice.util.getRunningQueriesThunk());
        queries.forEach((query) => query.abort());
    },
});

export type TypedQueryReturnValue<
    T = unknown,
    E = FetchBaseQueryError,
    M = FetchBaseQueryMeta,
> = QueryReturnValue<T, E, M>;
