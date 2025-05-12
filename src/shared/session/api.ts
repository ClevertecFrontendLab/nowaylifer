import { ApiEndpoints, apiSlice } from '../api';
import { ACCESS_TOKEN_HEADER } from '../config';
import { logout, setToken } from './slice';

export const sessionApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        checkAuth: build.query<void, void>({
            forceRefetch: () => true,
            query: () => ({ url: ApiEndpoints.AUTH_CHECK }),
        }),
        refreshToken: build.query<void, void>({
            query: () => ({ url: ApiEndpoints.AUTH_REFRESH_TOKEN }),
            forceRefetch: () => true,
            onQueryStarted: (_, { dispatch, queryFulfilled }) => {
                queryFulfilled.then((res) => {
                    const accessToken = res.meta?.response?.headers.get(ACCESS_TOKEN_HEADER);
                    if (accessToken) {
                        dispatch(setToken(accessToken));
                    } else {
                        dispatch(logout());
                    }
                });
            },
            extraOptions: {
                shouldLogError: false,
            },
        }),
    }),
});
