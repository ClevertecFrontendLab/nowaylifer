import { ErrorMessage } from '~/shared/infra/error-logger';
import { ErrorMetaByStatus } from '~/shared/infra/error-logger/query-error-logger';
import { HttpStatusCode } from '~/shared/util';

import { EditRecipeEndpointName } from './endpoint-name';

const common = {
    [HttpStatusCode.CONFLICT]: {
        title: ErrorMessage.ERROR,
        description: 'Рецепт с таким названием уже существует',
    },
    [HttpStatusCode.INTERNAL_SERVER_ERROR]: {
        title: ErrorMessage.SERVER_ERROR,
        description: 'Попробуйте пока сохранить в черновик',
    },
};

export const errorMeta: Partial<Record<EditRecipeEndpointName | 'uploadImage', ErrorMetaByStatus>> =
    {
        createRecipe: { ...common },
        updateRecipe: { ...common },
        deleteRecipe: {
            [HttpStatusCode.INTERNAL_SERVER_ERROR]: {
                title: ErrorMessage.SERVER_ERROR,
                description: 'Не удалось удалить рецепт',
            },
        },
        // TODO: maybe move to somewhere else
        uploadImage: {
            [HttpStatusCode.INTERNAL_SERVER_ERROR]: {
                title: ErrorMessage.SERVER_ERROR,
                description: 'Попробуйте сохранить фото позже',
            },
        },
    };
