import { runIfFn } from '@chakra-ui/utils';
import { BaseQueryEnhancer, BaseQueryResult } from '@reduxjs/toolkit/query/react';
import { merge } from 'lodash-es';

import { toast } from '../infra/toast';
import { QueryHttpError } from './common';
import { TypedQueryReturnValue } from './query';
import { isQueryHttpError, isServerError } from './util';

interface ErrorLogInfo {
    title: string;
    description?: string;
}

export interface ErrorLoggerOptions<T = unknown> {
    shouldLogError?: boolean | ((error: QueryHttpError<T>) => boolean);
    logger?: (info: ErrorLogInfo) => void;
    errorLogInfoByStatus?: Partial<
        Record<
            number | 'default',
            ErrorLogInfo | ((error: QueryHttpError<T>) => ErrorLogInfo | null) | null
        >
    >;
}

const defaultOptions: ErrorLoggerOptions = {
    shouldLogError: true,
    logger: (info) => {
        if (!toast.isActive('apiError')) {
            toast({ ...info, id: 'apiError', status: 'error' });
        }
    },
    errorLogInfoByStatus: {
        default: (error) =>
            isServerError(error)
                ? { title: 'Ошибка сервера', description: 'Попробуйте немного позже' }
                : null,
    },
};

export const withErrorLogger: BaseQueryEnhancer<
    unknown,
    ErrorLoggerOptions,
    ErrorLoggerOptions | void
> = (baseQuery, config) => async (args, api, extraOptions) => {
    const options: ErrorLoggerOptions = merge({}, defaultOptions, config, extraOptions);
    const res = await baseQuery(args, api, extraOptions);
    const err = res.error;

    if (err && isQueryHttpError(err) && runIfFn(options.shouldLogError, err)) {
        const errorByStatus =
            options.errorLogInfoByStatus?.[err.status] ?? options.errorLogInfoByStatus?.default;

        const info = runIfFn(errorByStatus, err);

        if (info) {
            options.logger?.(info);
        }
    }

    return res as TypedQueryReturnValue<BaseQueryResult<typeof baseQuery>>;
};
