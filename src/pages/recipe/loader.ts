import invariant from 'invariant';
import { LoaderFunction, replace, unstable_RouterContextProvider } from 'react-router';

import { recipeApi } from '~/entities/recipe';
import { storeContext } from '~/shared/router';

export const loader: LoaderFunction<unstable_RouterContextProvider> = async ({
    context,
    request,
    params,
}) => {
    const { dispatch } = context.get(storeContext);

    invariant(params.id, 'Recipe param id is empty string or undefined');

    const recipe = await dispatch(
        recipeApi.endpoints.recipeById.initiate(params.id, { subscribe: false }),
    ).unwrap();

    if (recipe._id !== params.id) {
        return replace(request.url.replace(params.id, recipe._id));
    }

    return recipe;
};
