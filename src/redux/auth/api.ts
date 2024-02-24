import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryBackend } from '@redux/base-query-backend';
import type { ChangePasswordPayload, LoginResponse, UserCredentials } from 'src/types';
import { sliceName } from '.';

export const authApi = createApi({
    reducerPath: `${sliceName}Api`,
    baseQuery: baseQueryBackend({ prefixUrl: '/auth', method: 'POST', minDelay: 1000 }),
    endpoints: (builder) => ({
        register: builder.mutation<void, UserCredentials>({
            query: (credentials) => ({
                url: '/registration',
                body: credentials,
            }),
        }),
        login: builder.mutation<LoginResponse, UserCredentials & { remember: boolean }>({
            query: ({ remember: _, ...credentials }) => ({
                url: '/login',
                body: credentials,
            }),
        }),
        checkEmail: builder.mutation<{ email: string; message: string }, UserCredentials['email']>({
            query: (email) => ({
                url: '/check-email',
                body: { email },
            }),
        }),
        confirmEmail: builder.mutation<void, { email: UserCredentials['email']; code: string }>({
            query: (arg) => ({
                url: '/confirm-email',
                body: arg,
            }),
        }),
        changePassword: builder.mutation<{ message: string }, ChangePasswordPayload>({
            query: (arg) => ({
                url: '/change-password',
                body: arg,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePasswordMutation,
} = authApi;
