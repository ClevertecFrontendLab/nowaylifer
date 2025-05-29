import { runIfFn } from '@chakra-ui/utils';
import { BaseQueryEnhancer, BaseQueryResult } from '@reduxjs/toolkit/query';
import { isObject, merge } from 'lodash-es';

import { QueryHttpError, TypedQueryReturnValue } from '~/shared/api';
import { isQueryHttpError, isServerError } from '~/shared/api/util';
import { HttpStatusCode } from '~/shared/util';

import { ErrorMessage } from './error-messages';
import { ErrorMeta, setLoggableError } from './slice';

export type ErrorMetaByStatus<T = unknown> = Partial<
    Record<number | 'default', ErrorMeta | ((error: QueryHttpError<T>) => ErrorMeta | null) | null>
>;

export interface QueryErrorLoggerOptions<T = unknown> {
    shouldLogError?: boolean | ((error: QueryHttpError<T>) => boolean);
    errorMetaByStatus?: ErrorMetaByStatus;
}

const defaultOptions: QueryErrorLoggerOptions = {
    shouldLogError: true,
    errorMetaByStatus: {
        [HttpStatusCode.TOO_MANY_REQUESTS]: {
            title: 'Превышен лимит запросов',
            description: ErrorMessage.TRY_AGAIN_LATER,
        },
        default: (error) =>
            isServerError(error)
                ? {
                      title: ErrorMessage.SERVER_ERROR,
                      description: ErrorMessage.TRY_AGAIN_LATER,
                  }
                : null,
    },
};

export type WithErrorLogMeta<T> = QueryErrorLoggerOptions & T;

export const withErrorLogger: BaseQueryEnhancer<
    { errorLogMeta?: QueryErrorLoggerOptions },
    QueryErrorLoggerOptions,
    QueryErrorLoggerOptions | void
> = (baseQuery, configOptions) => async (args, api, extraOptions) => {
    const requestOptions = (isObject(args) && args.errorLogMeta) || {};

    const options: QueryErrorLoggerOptions = merge(
        {},
        defaultOptions,
        configOptions,
        extraOptions,
        requestOptions,
    );

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
