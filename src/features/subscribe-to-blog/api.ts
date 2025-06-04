import HTTPMethod from 'http-method-enum';

import { blogApi, BlogEndpointName } from '~/entities/blog';
import { ApiEndpoint, apiSlice } from '~/shared/api';

const api = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        subscribeToBlog: build.mutation<void, { blogId: string; currentUserId: string }>({
            query: ({ blogId, currentUserId }) => ({
                url: ApiEndpoint.USER_TOGGLE_SUBSCRIPTION,
                method: HTTPMethod.PATCH,
                body: { toUserId: blogId, fromUserId: currentUserId },
            }),
            onQueryStarted: async ({ blogId }, { dispatch, getState, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    return console.error(error);
                }

                const entries = blogApi.util.selectInvalidatedBy(getState(), ['Blog']);

                // mark blog as favorite and move it from others to favorites
                entries.forEach(({ endpointName, originalArgs }) => {
                    const thunk = blogApi.util.updateQueryData(
                        endpointName as BlogEndpointName,
                        originalArgs,
                        (draft) => {
                            const blog = draft.others.find((blog) => blog._id === blogId);
                            if (!blog) return draft;

                            blog.isFavorite = true;
                            blog.subscribersCount++;

                            draft.others = draft.others.filter((blog) => blog._id !== blogId);
                            draft.favorites.push(blog);
                        },
                    );

                    dispatch(thunk);
                });
            },
        }),
    }),
});

export const { useSubscribeToBlogMutation } = api;
