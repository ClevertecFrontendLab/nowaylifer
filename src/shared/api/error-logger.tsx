import { runIfFn } from '@chakra-ui/utils';
import { BaseQueryEnhancer } from '@reduxjs/toolkit/query/react';
import { merge } from 'lodash-es';

import { toast } from '../infra/toast';
import { QueryApiError } from './common';
import { isQueryApiError, isServerError } from './util';

interface ErrorLogInfo {
    title: string;
    description?: string;
}

export interface ErrorLoggerOptions {
    shouldLogError?: boolean | ((error: QueryApiError) => boolean);
    logger?: (info: ErrorLogInfo) => void;
    errorLogInfoByStatus?: Partial<
        Record<
            number | 'default',
            ErrorLogInfo | ((error: QueryApiError) => ErrorLogInfo | null) | null
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

export const errorLogger: BaseQueryEnhancer<
    unknown,
    ErrorLoggerOptions,
    ErrorLoggerOptions | void
> = (baseQuery, config) => async (args, api, extraOptions) => {
    const options: ErrorLoggerOptions = merge({}, defaultOptions, config, extraOptions);
    const res = await baseQuery(args, api, extraOptions);
    const err = res.error;

    if (err && isQueryApiError(err) && runIfFn(options.shouldLogError, err)) {
        const errorByStatus =
            options.errorLogInfoByStatus?.[err.status] ?? options.errorLogInfoByStatus?.default;

        const info = runIfFn(errorByStatus, err);

        if (info) {
            options.logger?.(info);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- currently idk how to properly type this
    return res as any;
};
