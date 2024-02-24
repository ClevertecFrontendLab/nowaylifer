import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type FetchError<T> = T & FetchBaseQueryError;

type EmailNotExistError = FetchError<{
    message: 'Email не найден';
}>;

export const isEmailNotExistError = (
    error: FetchBaseQueryError | undefined,
): error is EmailNotExistError =>
    error?.status === 404 &&
    !!error?.data &&
    typeof error.data === 'object' &&
    'message' in error.data &&
    error.data.message === 'Email не найден';

export const isUserNotExistError = (error: FetchBaseQueryError | undefined) =>
    error?.status === 409;
