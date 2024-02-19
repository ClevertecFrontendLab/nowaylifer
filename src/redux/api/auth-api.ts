import type { QueryReturnValue } from 'node_modules/@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
    createApi,
    type FetchBaseQueryError,
    type FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { redirectAfterLogin, redirectToAuthResult, setToken } from '@redux/slices/auth-slice';
import type { LoginResponse, UserCredentials } from 'src/types';
import { baseQueryBackend } from '@redux/base-query-backend';

type QueryReturn<T> = QueryReturnValue<T, FetchBaseQueryError, FetchBaseQueryMeta>;

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryBackend({ prefixUrl: '/auth', method: 'POST' }),
    endpoints: (builder) => ({
        register: builder.mutation<void, UserCredentials>({
            queryFn: async (credentials, api, _, fetchWithBq) => {
                const response = (await fetchWithBq({
                    url: '/registration',
                    body: credentials,
                })) as QueryReturn<void>;

                const err = response.error;

                if (err) {
                    if (err.status === 409) api.dispatch(redirectToAuthResult('error-user-exist'));
                    else api.dispatch(redirectToAuthResult('error', { retry: credentials }));
                } else {
                    api.dispatch(redirectToAuthResult('success'));
                }

                return response;
            },
        }),
        login: builder.mutation<LoginResponse, UserCredentials & { remember: boolean }>({
            queryFn: async ({ remember, ...credentials }, api, _, fetchWithBQ) => {
                const response = (await fetchWithBQ({
                    url: '/login',
                    body: credentials,
                })) as QueryReturn<LoginResponse>;

                if (response.error) {
                    api.dispatch(redirectToAuthResult('error-login'));
                } else {
                    api.dispatch(setToken({ token: response.data.accessToken, remember }));
                    api.dispatch(redirectAfterLogin());
                }

                return response;
            },
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
