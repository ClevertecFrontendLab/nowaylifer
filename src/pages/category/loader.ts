import { selectActiveCategoriesInvariant } from '~/entities/category/selectors';
import { recipeApi } from '~/entities/recipe';
import { createRouteLoader, storeContext } from '~/shared/router';

export const loader = createRouteLoader(({ context, params }) => {
    const { dispatch, getState } = context.get(storeContext);
    const [, subCategory] = selectActiveCategoriesInvariant(getState(), params);
    return dispatch(
        recipeApi.endpoints.paginatedRecipesBySubCategory.initiate(
            { subCategoryId: subCategory._id },
            { subscribe: false },
        ),
    ).unwrap();
});
