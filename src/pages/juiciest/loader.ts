import { LoaderFunction, LoaderFunctionArgs, unstable_RouterContextProvider } from 'react-router';

import { recipeApi } from '~/entities/recipe';
import { storeContext } from '~/shared/router';

export const loader: LoaderFunction<unstable_RouterContextProvider> = async ({
    context,
}: LoaderFunctionArgs) => {
    const { dispatch } = context.get(storeContext);

    return await dispatch(
        recipeApi.endpoints.paginatedRecipes.initiate(
            { sortBy: 'likes', sortOrder: 'desc' },
            { subscribe: false },
        ),
    ).unwrap();
};
