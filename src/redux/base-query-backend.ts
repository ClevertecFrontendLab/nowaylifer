import { BACKEND_URL } from '@constants/config';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import { withMinDelay } from './base-query-enhancers';
import type { RootState } from './configure-store';

const getBaseURL = (url: string, base?: string) => new URL(url, base).href;

type BaseQueryBackendOptions = {
    prefixUrl?: string;
    method?: string;
    minDelay?: number;
};

export const baseQueryBackend = ({
    prefixUrl = '',
    method = 'GET',
    minDelay,
}: BaseQueryBackendOptions = {}) =>
    withMinDelay(
        fetchBaseQuery({
            baseUrl: getBaseURL(prefixUrl, BACKEND_URL),
            method,
            credentials: 'include',
            prepareHeaders: (headers, { getState }) => {
                const { token } = (getState() as RootState).auth;

                if (token) {
                    headers.set('authorization', `Bearer ${token}`);
                }

                return headers;
            },
        }),
        { minDelay },
    );
