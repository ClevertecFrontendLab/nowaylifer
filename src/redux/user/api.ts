import { baseQueryBackend } from '@redux/base-query-backend';
import { RootState } from '@redux/configure-store';
import { createApi } from '@reduxjs/toolkit/query/react';

import { EditUserDTO, User } from './types';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryBackend({ prefixUrl: 'user', minDelay: 500 }),
    endpoints: (builder) => ({
        fetchCurrentUser: builder.query<User, void>({
            query: () => '/me',
        }),
        editCurrentUser: builder.mutation<User, EditUserDTO>({
            query: (dto) => ({
                url: '',
                method: 'PUT',
                body: dto,
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                try {
                    const { data: updatedUser } = await queryFulfilled;

                    dispatch(
                        userApi.util.updateQueryData(
                            'fetchCurrentUser',
                            undefined,
                            () => updatedUser,
                        ),
                    );
                } catch {
                    // ignore
                }
            },
        }),
    }),
});

export const { useFetchCurrentUserQuery, useEditCurrentUserMutation } = userApi;

export const usePrefetchUser = () => userApi.usePrefetch('fetchCurrentUser');

const selectUserCacheEntry = userApi.endpoints.fetchCurrentUser.select();

export const selectUser = (state: RootState) => selectUserCacheEntry(state).data;
