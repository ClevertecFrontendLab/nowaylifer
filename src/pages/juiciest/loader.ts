import { recipeApi } from '~/entities/recipe';
import { createRouteLoader, storeContext } from '~/shared/router';

export const loader = createRouteLoader(({ context }) => {
    const { dispatch } = context.get(storeContext);
    return dispatch(
        recipeApi.endpoints.paginatedRecipes.initiate(
            { sortBy: 'likes', sortOrder: 'desc' },
            { subscribe: false },
        ),
    ).unwrap();
});
