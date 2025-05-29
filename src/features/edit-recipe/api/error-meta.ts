import { ErrorMessage } from '~/shared/infra/error-logger';
import { ErrorMetaByStatus } from '~/shared/infra/error-logger/query-error-logger';
import { HttpStatusCode } from '~/shared/util';

import { EditRecipeEndpointName } from './endpoint-name';

const conflictError = {
    title: ErrorMessage.ERROR,
    description: 'Рецепт с таким названием уже существует',
};

const serverError = {
    title: ErrorMessage.SERVER_ERROR,
    description: 'Попробуйте пока сохранить в черновик',
};

export const errorMeta: Partial<Record<EditRecipeEndpointName | 'uploadImage', ErrorMetaByStatus>> =
    {
        createRecipe: {
            [HttpStatusCode.CONFLICT]: conflictError,
            [HttpStatusCode.INTERNAL_SERVER_ERROR]: serverError,
        },
        uploadImage: {
            [HttpStatusCode.INTERNAL_SERVER_ERROR]: {
                title: ErrorMessage.SERVER_ERROR,
                description: 'Попробуйте сохранить фото позже',
            },
        },
    };
