import { replace } from 'redux-first-history';
import { BACKEND_URL } from '@constants/config';
import { type BaseQueryEnhancer, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { RoutePath } from '@router/paths';
import { waitFor } from '@utils/wait-for';
import type { QueryReturnValue } from 'node_modules/@reduxjs/toolkit/dist/query/baseQueryTypes';

import { setToken } from './auth';
import type { RootState } from './configure-store';

type AnyQueryReturn = QueryReturnValue<any, any, any>;

type MinDelayOptions = {
    minDelay?: number;
};

const withMinDelay: BaseQueryEnhancer<unknown, MinDelayOptions, MinDelayOptions | void> =
    (baseQuery, defaultOptons) => async (args, api, extraOptions) => {
        const options = { ...defaultOptons, ...extraOptions };
        const start = Date.now();
        const result = await baseQuery(args, api, extraOptions);
        const diff = Date.now() - start;

        if (options.minDelay && diff < options.minDelay) {
            await waitFor(options.minDelay - diff);
        }

        return result as AnyQueryReturn;
    };

const isAuthError = (error: unknown) =>
    !!error && typeof error === 'object' && 'status' in error && error.status === 403;

const withHandleAuthError: BaseQueryEnhancer = (baseQuery) => async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error && isAuthError(result.error)) {
        api.dispatch(setToken(null));
        api.dispatch(replace(RoutePath.Login));
    }

    return result as AnyQueryReturn;
};

const getBaseURL = (url: string, base?: string) => new URL(url, base).href;

type BaseQueryBackendOptions = {
    prefixUrl?: string;
    method?: string;
    minDelay?: number;
};

export const baseQueryBackend = ({
    prefixUrl = '',
    method = 'GET',
    minDelay,
}: BaseQueryBackendOptions = {}) =>
    withHandleAuthError(
        withMinDelay(
            fetchBaseQuery({
                baseUrl: getBaseURL(prefixUrl, BACKEND_URL),
                method,
                credentials: 'include',
                prepareHeaders: (headers, { getState }) => {
                    const { token } = (getState() as RootState).auth;

                    if (token) {
                        headers.set('authorization', `Bearer ${token}`);
                    }

                    return headers;
                },
            }),
            { minDelay },
        ),
    );
