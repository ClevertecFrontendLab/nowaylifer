import { BACKEND_URL } from '@constants/config';
import { fetchBaseQuery, type BaseQueryEnhancer } from '@reduxjs/toolkit/query';
import { Path } from '@router/paths';
import { waitFor } from '@utils/waitFor';
import type { QueryReturnValue } from 'node_modules/@reduxjs/toolkit/dist/query/baseQueryTypes';
import { replace } from 'redux-first-history';
import { setToken } from './auth';
import type { RootState } from './configure-store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        api.dispatch(replace(Path.Login));
    }
    return result as AnyQueryReturn;
};

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
                baseUrl: BACKEND_URL + prefixUrl,
                method,
                credentials: 'include',
                prepareHeaders: (headers, { getState }) => {
                    const token = (getState() as RootState).auth.token;
                    if (token) {
                        headers.set('authorization', `Bearer ${token}`);
                    }
                    return headers;
                },
            }),
            { minDelay },
        ),
    );
