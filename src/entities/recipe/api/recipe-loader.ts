import invariant from 'invariant';
import { redirect, replace } from 'react-router';

import { isClientError } from '~/shared/api/util';
import { createRouteLoader, RouteParam, RoutePath, storeContext } from '~/shared/router';

import { recipeApi } from './query';

export const recipeLoader = createRouteLoader(async ({ context, params, request }) => {
    const { dispatch } = context.get(storeContext);
    const recipeId = params[RouteParam.RecipeId];

    invariant(recipeId, `${RouteParam.RecipeId} param is empty string or undefined`);

    const result = await dispatch(
        recipeApi.endpoints.recipeById.initiate(recipeId, { subscribe: false }),
    );

    if (result.error) {
        if (isClientError(result.error)) {
            return redirect(RoutePath.NotFound);
        }
        throw result.error;
    }

    const recipe = result.data!;

    if (recipe._id !== recipeId) {
        return replace(request.url.replace(recipeId, recipe._id));
    }

    return recipe;
});
