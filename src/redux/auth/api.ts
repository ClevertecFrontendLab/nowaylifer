import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryBackend } from '@redux/base-query-backend';
import type { LoginResponse, UserCredentials } from 'src/types';

const DELAY = 1000;

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryBackend({ prefixUrl: '/auth', method: 'POST' }),
    endpoints: (builder) => ({
        register: builder.mutation<void, UserCredentials>({
            query: (credentials) => ({
                url: '/registration',
                body: credentials,
            }),
            extraOptions: { minDelay: DELAY },
        }),
        // remember is used in listener middleware
        login: builder.mutation<LoginResponse, UserCredentials & { remember: boolean }>({
            query: ({ remember: _, ...credentials }) => ({
                url: '/login',
                body: credentials,
            }),
            extraOptions: { minDelay: DELAY },
        }),
        checkEmail: builder.mutation<{ email: string; message: string }, UserCredentials['email']>({
            query: (email) => ({
                url: '/check-email',
                body: { email },
            }),
            extraOptions: { minDelay: DELAY },
        }),
        confirmEmail: builder.mutation<void, { email: string; code: string }>({
            query: (arg) => ({
                url: '/confirm-email',
                body: arg,
            }),
            extraOptions: { minDelay: DELAY },
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
} = authApi;
