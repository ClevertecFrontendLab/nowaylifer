import { baseQueryBackend } from '@redux/base-query-backend';
import { createApi } from '@reduxjs/toolkit/query/react';

import { EditUserDTO, User } from './types';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryBackend({ prefixUrl: 'user', minDelay: 1000 }),
    endpoints: (builder) => ({
        fetchCurrentUser: builder.query<User, void>({
            query: () => '/me',
        }),
        editCurrentUser: builder.mutation<User, EditUserDTO>({
            query: (dto) => ({
                url: '',
                method: 'POST',
                body: dto,
            }),
        }),
    }),
});

export const { useFetchCurrentUserQuery, useEditCurrentUserMutation } = userApi;
