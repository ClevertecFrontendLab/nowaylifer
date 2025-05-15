import invariant from 'invariant';
import { replace } from 'react-router';

import { recipeApi } from '~/entities/recipe';
import { createRouteLoader, storeContext } from '~/shared/router';

export const loader = createRouteLoader(async ({ context, params, request }) => {
    const { dispatch } = context.get(storeContext);

    invariant(params.id, 'Recipe param id is empty string or undefined');

    const recipe = await dispatch(
        recipeApi.endpoints.recipeById.initiate(params.id, { subscribe: false }),
    ).unwrap();

    if (recipe._id !== params.id) {
        return replace(request.url.replace(params.id, recipe._id));
    }

    return recipe;
});
