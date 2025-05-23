import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { apiErrorResponseSchema, QueryApiError, QueryHttpError } from './common';

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError =>
    typeof error === 'object' && error != null && 'status' in error;

export const isQueryHttpError = (error: unknown): error is QueryHttpError =>
    isFetchBaseQueryError(error) && typeof error.status === 'number';

export const isQueryApiError = (error: unknown): error is QueryApiError =>
    isQueryHttpError(error) && apiErrorResponseSchema.safeParse(error.data).success;

export const isServerError = (error: unknown) => isQueryHttpError(error) && error.status >= 500;

export const isClientError = (error: unknown) =>
    isQueryHttpError(error) && error.status >= 400 && error.status < 500;
