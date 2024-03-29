import { replace } from 'redux-first-history';
import { BaseQueryEnhancer } from '@reduxjs/toolkit/query';
import { RoutePath } from '@router/paths';
import { waitFor } from '@utils/wait-for';
import { QueryReturnValue } from 'node_modules/@reduxjs/toolkit/dist/query/baseQueryTypes';

import { setToken } from './auth';

type AnyQueryReturn = QueryReturnValue<any, any, any>;

type MinDelayOptions = {
    minDelay?: number;
};

export const withMinDelay: BaseQueryEnhancer<unknown, MinDelayOptions, MinDelayOptions | void> =
    (baseQuery, defaultOptons) => async (args, api, extraOptions) => {
        const options = { ...defaultOptons, ...extraOptions };
        const start = Date.now();
        const result = await baseQuery(args, api, extraOptions);
        const diff = Date.now() - start;

        if (options.minDelay && diff < options.minDelay) {
            await waitFor(options.minDelay - diff);
        }

        return result as AnyQueryReturn;
    };

const isAuthError = (error: unknown) =>
    !!error && typeof error === 'object' && 'status' in error && error.status === 403;

export const withHandleAuthError: BaseQueryEnhancer =
    (baseQuery) => async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions);

        if (result.error && isAuthError(result.error)) {
            api.dispatch(setToken(null));
            api.dispatch(replace(RoutePath.Login));
        }

        return result as AnyQueryReturn;
    };
