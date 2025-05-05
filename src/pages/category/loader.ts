import { LoaderFunction, LoaderFunctionArgs, unstable_RouterContextProvider } from 'react-router';

import { selectActiveCategoriesInvariant } from '~/entities/category/selectors';
import { recipeApi } from '~/entities/recipe';
import { storeContext } from '~/shared/router';

export const loader: LoaderFunction<unstable_RouterContextProvider> = async ({
    context,
    params,
}: LoaderFunctionArgs) => {
    const { dispatch, getState } = context.get(storeContext);
    const [, subCategory] = selectActiveCategoriesInvariant(getState(), params);

    return await dispatch(
        recipeApi.endpoints.paginatedRecipesBySubCategory.initiate(
            { subCategoryId: subCategory._id },
            { subscribe: false },
        ),
    ).unwrap();
};
