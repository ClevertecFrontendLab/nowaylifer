import { ApiEndpoint, apiSlice } from '~/shared/api';

import { Blog } from '../interface';

interface BlogsQueryParams {
    currentUserId: string;
    limit?: number | 'all';
}

interface BlogsResponse {
    others: Blog[];
    favorites: Blog[];
}

export const blogApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        blogs: build.query<BlogsResponse, BlogsQueryParams>({
            query: (params) => ({
                url: ApiEndpoint.BLOGS,
                params: { limit: 9, ...params },
            }),
            providesTags: ['Blog'],
        }),
    }),
});
