import HTTPMethod from 'http-method-enum';

import { Recipe } from '~/entities/recipe';
import { ApiEndpoint, apiSlice } from '~/shared/api';

import { MeasureUnit, RecipeDraft } from '../types';
import { EditRecipeEndpointName } from './endpoint-name';
import { errorMeta } from './error-meta';

export const editRecipeApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        [EditRecipeEndpointName.CreateRecipe]: build.mutation<Recipe, RecipeDraft>({
            query: (draft) => ({ url: ApiEndpoint.RECIPE, method: HTTPMethod.POST, body: draft }),
            extraOptions: {
                errorMetaByStatus: errorMeta.createRecipe,
            },
        }),
        [EditRecipeEndpointName.MeasureUntis]: build.query<MeasureUnit[], void>({
            query: () => ({ url: ApiEndpoint.MEASURE_UNITS }),
        }),
    }),
});
