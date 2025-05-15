import { runIfFn } from '@chakra-ui/utils';
import { BaseQueryEnhancer, BaseQueryResult } from '@reduxjs/toolkit/query';
import { merge } from 'lodash';

import { QueryHttpError, TypedQueryReturnValue } from '~/shared/api';
import { isQueryHttpError, isServerError } from '~/shared/api/util';
import { HttpStatusCode } from '~/shared/util';

import { ErrorMeta, setLoggableError } from './slice';

export interface QueryErrorLoggerOptions<T = unknown> {
    shouldLogError?: boolean | ((error: QueryHttpError<T>) => boolean);
    errorMetaByStatus?: Partial<
        Record<
            number | 'default',
            ErrorMeta | ((error: QueryHttpError<T>) => ErrorMeta | null) | null
        >
    >;
}

const defaultOptions: QueryErrorLoggerOptions = {
    shouldLogError: true,
    errorMetaByStatus: {
        [HttpStatusCode.TOO_MANY_REQUESTS]: {
            title: 'Превышен лимит запросов',
            description: 'Попробуйте немного позже',
        },
        default: (error) =>
            isServerError(error)
                ? { title: 'Ошибка сервера', description: 'Попробуйте немного позже' }
                : null,
    },
};

export const withErrorLogger: BaseQueryEnhancer<
    unknown,
    QueryErrorLoggerOptions,
    QueryErrorLoggerOptions | void
> = (baseQuery, config) => async (args, api, extraOptions) => {
    const options: QueryErrorLoggerOptions = merge({}, defaultOptions, config, extraOptions);
    const res = await baseQuery(args, api, extraOptions);
    const err = res.error;

    if (err && isQueryHttpError(err) && runIfFn(options.shouldLogError, err)) {
        const errorByStatus =
            options.errorMetaByStatus?.[err.status] ?? options.errorMetaByStatus?.default;
        const meta = runIfFn(errorByStatus, err) ?? null;
        api.dispatch(setLoggableError({ error: err, meta, endpoint: api.endpoint }));
    }

    return res as TypedQueryReturnValue<BaseQueryResult<typeof baseQuery>>;
};
