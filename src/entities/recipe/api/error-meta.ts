import { ErrorMessage } from '~/shared/infra/error-logger';
import { ErrorMetaByStatus } from '~/shared/infra/error-logger/query-error-logger';
import { HttpStatusCode } from '~/shared/util';

import { RecipeEndpointName } from './endpoint-name';

const common = {
    [HttpStatusCode.NOT_FOUND]: {
        title: ErrorMessage.SERVER_ERROR,
        description: 'Попробуйте поискать снова попозже',
    },
};

export const errorMeta: Partial<Record<RecipeEndpointName, ErrorMetaByStatus>> = {
    paginatedRecipesBySubCategory: { ...common },
    recipesBySubCategory: { ...common },
    paginatedRecipes: { ...common },
};
