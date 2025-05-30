import invariant from 'invariant';
import { redirect, replace } from 'react-router';

import { isClientError } from '~/shared/api/util';
import { createRouteLoader, RouteParam, RoutePath, storeContext } from '~/shared/router';

import { recipeApi } from './query';

export const recipeLoader = createRouteLoader(async ({ context, params, request }) => {
    const { dispatch } = context.get(storeContext);
    const recipeId = params[RouteParam.RecipeId];

    invariant(recipeId, 'RecipeId param is empty string or undefined');

    let recipe;

    try {
        recipe = await dispatch(
            recipeApi.endpoints.recipeById.initiate(recipeId, { subscribe: false }),
        ).unwrap();
    } catch (error) {
        if (isClientError(error)) {
            return redirect(RoutePath.NotFound);
        }
        throw error;
    }

    if (recipe._id !== recipeId) {
        return replace(request.url.replace(recipeId, recipe._id));
    }

    return recipe;
});
