import HTTPMethod from 'http-method-enum';

import { Recipe } from '~/entities/recipe';
import { ApiEndpoint, apiSlice } from '~/shared/api';
import { HttpMethod } from '~/shared/util';

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
                url: `${ApiEndpoint.RECIPE}/${recipeId}`,
                method: HttpMethod.PATCH,
                body: updates,
            }),
            invalidatesTags: ['Recipe'],
            extraOptions: { errorMetaByStatus: errorMeta.updateRecipe },
        }),
        [EditRecipeEndpointName.DeleteRecipe]: build.mutation<void, string>({
            query: (recipeId) => ({
                url: `${ApiEndpoint.RECIPE}/${recipeId}`,
                method: HttpMethod.DELETE,
            }),
            invalidatesTags: ['Recipe'],
            extraOptions: { errorMetaByStatus: errorMeta.deleteRecipe },
        }),
        [EditRecipeEndpointName.MeasureUntis]: build.query<MeasureUnit[], void>({
            query: () => ({ url: ApiEndpoint.MEASURE_UNITS }),
        }),
    }),
});
