import invariant from 'invariant';
import { replace } from 'react-router';

import { recipeApi } from '~/entities/recipe';
import { createRouteLoader, RouteParam, storeContext } from '~/shared/router';

export const loader = createRouteLoader(async ({ context, params, request }) => {
    const { dispatch } = context.get(storeContext);
    const recipeId = params[RouteParam.RecipeId];

    invariant(recipeId, 'RecipeId param is empty string or undefined');

    const recipe = await dispatch(
        recipeApi.endpoints.recipeById.initiate(recipeId, { subscribe: false }),
    ).unwrap();

    if (recipe._id !== recipeId) {
        return replace(request.url.replace(recipeId, recipe._id));
    }

    return recipe;
});
