import { ApiEndpoint, apiSlice } from '~/shared/api';
import { joinPath } from '~/shared/router/util';

import { Blog, BlogDetailed } from '../interface';
import { BlogEndpointName } from './endpoint-name';

export interface BlogsResponse {
    others: Blog[];
    favorites: Blog[];
}

interface BlogsQueryParams {
    currentUserId: string;
    limit?: number | 'all';
}

export const blogApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        [BlogEndpointName.Blog]: build.query<
            BlogDetailed,
            { currentUserId: string; bloggerId: string }
        >({
            query: ({ bloggerId, currentUserId }) => ({
                url: joinPath(ApiEndpoint.BLOGS, bloggerId),
                params: { currentUserId },
            }),
            providesTags: ['Blog'],
        }),
        [BlogEndpointName.Blogs]: build.query<BlogsResponse, BlogsQueryParams>({
            query: (params) => ({
                url: ApiEndpoint.BLOGS,
                params: { limit: 9, ...params },
            }),
            providesTags: ['Blog'],
        }),
        [BlogEndpointName.OtherBlogs]: build.query<Blog[], BlogsQueryParams>({
            query: (params) => ({
                url: ApiEndpoint.BLOGS,
                params: { limit: 4, ...params },
            }),
            transformResponse: (data: BlogsResponse) => data.others,
            providesTags: ['Blog'],
        }),
    }),
});
