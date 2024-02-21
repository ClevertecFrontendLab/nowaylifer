import type { QueryReturnValue } from 'node_modules/@reduxjs/toolkit/dist/query/baseQueryTypes';
import { fetchBaseQuery, type BaseQueryEnhancer } from '@reduxjs/toolkit/query';
import type { RootState } from './configure-store';
import { waitFor } from '@utils/waitFor';

type MinDelayOptions = {
    minDelay?: number;
};

const minDelay: BaseQueryEnhancer<unknown, MinDelayOptions, MinDelayOptions | void> =
    (baseQuery, defaultOptons) => async (args, api, extraOptions) => {
        const options = { ...defaultOptons, ...extraOptions };
        const start = Date.now();
        const result = await baseQuery(args, api, extraOptions);
        const diff = Date.now() - start;

        if (options.minDelay && diff < options.minDelay) {
            await waitFor(options.minDelay - diff);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return result as QueryReturnValue<any, any, any>;
    };

type BaseQueryBackendOptions = {
    prefixUrl?: string;
    method?: string;
};

export const baseQueryBackend = ({ prefixUrl = '', method = 'GET' }: BaseQueryBackendOptions) =>
    minDelay(
        fetchBaseQuery({
            baseUrl: import.meta.env.VITE_BACKEND_URL + prefixUrl,
            method,
            credentials: 'include',
            prepareHeaders: (headers, { getState }) => {
                const token = (getState() as RootState).auth.token;
                if (token) {
                    headers.set('authorization', `Bearer ${token}`);
                }
                return headers;
            },
        }),
    );
