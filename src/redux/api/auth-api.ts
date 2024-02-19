import { replace } from 'redux-first-history';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { LocationWithState } from '@hooks/use-app-location';
import { baseQueryBackend } from '@redux/base-query-backend';
import type { RootState } from '@redux/configure-store';
import { setToken } from '@redux/slices/auth-slice';
import type { UserCredentials } from 'src/types';

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

                const state = api.getState() as RootState;
                const location = state.router.location as LocationWithState;

                if (location.state?.from) {
                    api.dispatch(replace(location.state.from));
                }
            },
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
