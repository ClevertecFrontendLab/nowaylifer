import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { RootState } from './configure-store';

export type BaseQueryBackendOptions = {
    prefixUrl?: string;
    method?: string;
};

export const baseQueryBackend = ({ prefixUrl = '', method = 'GET' }: BaseQueryBackendOptions) =>
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
    });
