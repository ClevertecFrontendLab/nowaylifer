import { BaseQueryEnhancer, BaseQueryResult } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';

import { ACCESS_TOKEN_HEADER } from '../config';
import { SessionEndpointName } from '../session/endpoint-name';
import { logout, setToken } from '../session/slice';
import { HttpStatusCode } from '../util';
import { ApiEndpoint } from './endpoints';
import { TypedQueryReturnValue } from './query';

const mutex = new Mutex();

const excludedEndpoints: string[] = [
    SessionEndpointName.CheckAuth,
    SessionEndpointName.RefreshToken,
];

export const withRefreshToken: BaseQueryEnhancer<unknown, unknown, void> =
    (baseQuery) => async (args, api, extraOptions) => {
        type QueryResult = TypedQueryReturnValue<BaseQueryResult<typeof baseQuery>>;

        await mutex.waitForUnlock();

        const result = (await baseQuery(args, api, extraOptions)) as QueryResult;

        if (
            !(result.error && result.error.status === HttpStatusCode.FORBIDDEN) ||
            excludedEndpoints.includes(api.endpoint)
        ) {
            return result;
        }

        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const refreshResult = (await baseQuery(
                    ApiEndpoint.AUTH_REFRESH_TOKEN,
                    api,
                    extraOptions,
                )) as QueryResult;

                const accessToken = refreshResult.meta?.response?.headers.get(ACCESS_TOKEN_HEADER);

                if (accessToken) {
                    api.dispatch(setToken(accessToken));
                } else {
                    api.dispatch(logout());
                }
            } finally {
                release();
            }
        }

        await mutex.waitForUnlock();
        return baseQuery(args, api, extraOptions) as QueryResult;
    };
