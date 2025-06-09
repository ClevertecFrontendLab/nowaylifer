import HTTPMethod from 'http-method-enum';
import { Draft } from 'immer';
import { UnionToIntersection } from 'type-fest';

import { blogApi, BlogEndpointName, BlogsResponse } from '~/entities/blog';
import { Blog, BlogDetailed } from '~/entities/blog/interface';
import { ApiEndpoint, apiSlice } from '~/shared/api';

const api = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        toggleBlogSubscription: build.mutation<void, { bloggerId: string; currentUserId: string }>({
            query: ({ bloggerId, currentUserId }) => ({
                url: ApiEndpoint.USER_TOGGLE_SUBSCRIPTION,
                method: HTTPMethod.PATCH,
                body: { toUserId: bloggerId, fromUserId: currentUserId },
            }),
            onQueryStarted: async ({ bloggerId }, { dispatch, getState, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    return console.error(error);
                }

                const entries = blogApi.util.selectInvalidatedBy(getState(), ['Blog']);

                entries.forEach(({ endpointName, originalArgs }) => {
                    const endpoint = endpointName as BlogEndpointName;
                    const updater = toggleSubscriptionCacheUpdaters[endpoint];

                    if (!updater) return;

                    dispatch(
                        blogApi.util.updateQueryData(endpoint, originalArgs, (draft) =>
                            updater(
                                draft as UnionToIntersection<BlogApiResultTypeUnion>,
                                bloggerId,
                            ),
                        ),
                    );
                });
            },
        }),
    }),
});

type BlogApiResultTypeUnion = {
    [K in BlogEndpointName]: (typeof blogApi.endpoints)[K]['Types']['ResultType'];
}[BlogEndpointName];

const toggleSubscriptionCacheUpdaters = {
    [BlogEndpointName.Blog]: (blog: Draft<BlogDetailed>) => {
        blog.isFavorite = !blog.isFavorite;
        blog.totalSubscribers += blog.isFavorite ? 1 : -1;
    },
    [BlogEndpointName.Blogs]: (data: Draft<BlogsResponse>, blogId: string) => {
        const blog = [...data.favorites, ...data.others].find((blog) => blog._id === blogId);
        if (!blog) return data;

        blog.isFavorite = !blog.isFavorite;
        blog.subscribersCount += blog.isFavorite ? 1 : -1;

        if (blog.isFavorite) {
            data.others = data.others.filter((blog) => blog._id !== blogId);
            data.favorites.push(blog);
        } else {
            data.favorites = data.favorites.filter((blog) => blog._id !== blogId);
            data.others.push(blog);
        }
    },
    [BlogEndpointName.OtherBlogs]: (blogs: Draft<Blog[]>, blogId: string) => {
        blogs.forEach((blog) => {
            if (blog._id === blogId) {
                blog.isFavorite = !blog.isFavorite;
                blog.subscribersCount += blog.isFavorite ? 1 : -1;
            }
        });
    },
};

export const { useToggleBlogSubscriptionMutation } = api;
