import { ApiEndpoint, apiSlice } from '~/shared/api';

import { Blog } from '../interface';

interface BlogsQueryParams {
    currentUserId: string;
    limit?: number | 'all';
}

export const blogApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        blogs: build.query<{ others: Blog[]; favorites: Blog[] }, BlogsQueryParams>({
            query: (params) => ({
                url: ApiEndpoint.BLOGS,
                params: { limit: 9, ...params },
            }),
        }),
    }),
});
