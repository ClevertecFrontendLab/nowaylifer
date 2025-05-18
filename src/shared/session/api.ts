import { noop } from 'lodash-es';

import { ApiEndpoint, apiSlice } from '../api';
import { ACCESS_TOKEN_HEADER } from '../config';
import { SessionEndpointName } from '.';
import { logout, setToken } from './slice';

export const sessionApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        [SessionEndpointName.CheckAuth]: build.query<void, void>({
            forceRefetch: () => true,
            query: () => ({ url: ApiEndpoint.AUTH_CHECK }),
        }),
        [SessionEndpointName.RefreshToken]: build.query<void, void>({
            query: () => ({ url: ApiEndpoint.AUTH_REFRESH_TOKEN }),
            forceRefetch: () => true,
            onQueryStarted: (_, { dispatch, queryFulfilled }) => {
                queryFulfilled.then((res) => {
                    const accessToken = res.meta?.response?.headers.get(ACCESS_TOKEN_HEADER);
                    if (accessToken) {
                        dispatch(setToken(accessToken));
                    } else {
                        dispatch(logout());
                    }
                }, noop);
            },
            extraOptions: {
                shouldLogError: false,
            },
        }),
    }),
});
