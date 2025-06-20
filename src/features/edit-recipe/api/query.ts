import HTTPMethod from 'http-method-enum';

import { Recipe, recipeApi, RecipeEndpointName } from '~/entities/recipe';
import { ApiEndpoint, apiSlice } from '~/shared/api';
import { joinPath } from '~/shared/router/util';
import { HttpMethod, stripEmptyStringsDeep } from '~/shared/util';

import { MeasureUnit, RecipeDraft } from '../types';
import { EditRecipeEndpointName } from './endpoint-name';
import { errorMeta } from './error-meta';

export const editRecipeApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        [EditRecipeEndpointName.CreateRecipe]: build.mutation<Recipe, RecipeDraft>({
            query: (draft) => ({ url: ApiEndpoint.RECIPE, method: HTTPMethod.POST, body: draft }),
            invalidatesTags: ['Recipe'],
            extraOptions: { errorMetaByStatus: errorMeta.createRecipe },
        }),
        [EditRecipeEndpointName.UpdateRecipe]: build.mutation<
            Recipe,
            { recipeId: string; updates: Partial<RecipeDraft> }
        >({
            query: ({ recipeId, updates }) => ({
                url: joinPath(ApiEndpoint.RECIPE, recipeId),
                method: HttpMethod.PATCH,
                body: updates,
            }),
            invalidatesTags: ['Recipe'],
            extraOptions: { errorMetaByStatus: errorMeta.updateRecipe },
        }),
        [EditRecipeEndpointName.DeleteRecipe]: build.mutation<void, string>({
            query: (recipeId) => ({
                url: joinPath(ApiEndpoint.RECIPE, recipeId),
                method: HttpMethod.DELETE,
            }),
            onQueryStarted: async (recipeId, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    return console.error(error);
                }
                // manually delete cache entry for individual recipe
                dispatch(
                    recipeApi.util.updateQueryData(
                        RecipeEndpointName.RecipeById,
                        recipeId,
                        () => undefined,
                    ),
                );
            },
            invalidatesTags: [{ type: 'Recipe', id: 'LIST' }],
            extraOptions: { errorMetaByStatus: errorMeta.deleteRecipe },
        }),
        [EditRecipeEndpointName.SaveDraft]: build.mutation<void, RecipeDraft>({
            query: (draft) => ({
                url: ApiEndpoint.RECIPE_DRAFT,
                method: HttpMethod.POST,
                body: stripEmptyStringsDeep(draft),
            }),
            extraOptions: { errorMetaByStatus: errorMeta.saveDraft },
        }),
        [EditRecipeEndpointName.MeasureUntis]: build.query<MeasureUnit[], void>({
            query: () => ({ url: ApiEndpoint.MEASURE_UNITS }),
        }),
    }),
});
