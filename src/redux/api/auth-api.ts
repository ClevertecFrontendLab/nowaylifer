import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryBackend } from '@redux/base-query-backend';
import type { UserCredentials } from 'src/types';
import { setToken } from '@redux/slices/auth-slice';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryBackend({ prefixUrl: '/auth', method: 'POST' }),
    endpoints: (builder) => ({
        register: builder.mutation<void, UserCredentials>({
            query: (credentials) => ({
                url: '/registration',
                body: credentials,
            }),
        }),
        login: builder.mutation<{ accessToken: string }, UserCredentials & { remember: boolean }>({
            query: (credentials) => ({
                url: '/login',
                body: credentials,
            }),
            onQueryStarted: async ({ remember }, api) => {
                const response = await api.queryFulfilled;
                api.dispatch(setToken({ token: response.data.accessToken, remember }));
            },
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
