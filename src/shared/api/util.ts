import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { apiErrorResponseSchema, QueryApiError, QueryHttpError } from './common';

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError =>
    typeof error === 'object' && error != null && 'status' in error;

export const isQueryHttpError = (error: unknown): error is QueryHttpError =>
    isFetchBaseQueryError(error) && typeof error.status === 'number';

export const isQueryApiError = (error: unknown): error is QueryApiError =>
    isQueryHttpError(error) && apiErrorResponseSchema.safeParse(error.data).success;
