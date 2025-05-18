import { isQueryApiError } from '~/shared/api';
import { ErrorMetaByStatus } from '~/shared/infra/error-logger/query-error-logger';
import { HttpStatusCode } from '~/shared/util';

import { AuthEndpointName } from './endpoint-name';

export const authErrorMetaByStatus: Partial<Record<AuthEndpointName, ErrorMetaByStatus>> = {
    login: {
        default: null,
        [HttpStatusCode.UNAUTHORIZED]: {
            title: 'Неверный логин или пароль',
            description: 'Попробуйте снова',
        },
        [HttpStatusCode.FORBIDDEN]: {
            title: 'E-mail не верифицирован',
            description: 'Проверьте почту и перейдите по ссылке',
        },
    },
    signup: {
        [HttpStatusCode.BAD_REQUEST]: (error) =>
            isQueryApiError(error) ? { title: error.data.message } : null,
    },
    recoverPassword: {
        [HttpStatusCode.FORBIDDEN]: {
            title: 'Такого e-mail нет',
            description: 'Попробуйте другой e-mail или проверьте правильность его написания',
        },
    },
};
