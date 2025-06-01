import { ApiEndpoint, apiSlice } from '~/shared/api';
import { joinPath } from '~/shared/router/util';
import { HttpMethod } from '~/shared/util';

export const reactToRecipeApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        likeRecipe: build.mutation<void, string>({
            query: (recipeId) => ({
                url: joinPath(ApiEndpoint.RECIPE, recipeId, 'like'),
                method: HttpMethod.POST,
            }),
            invalidatesTags: ['Recipe'],
        }),
        bookmarkRecipe: build.mutation<void, string>({
            query: (recipeId) => ({
                url: joinPath(ApiEndpoint.RECIPE, recipeId, 'bookmark'),
                method: HttpMethod.POST,
            }),
            invalidatesTags: ['Recipe'],
        }),
    }),
});
