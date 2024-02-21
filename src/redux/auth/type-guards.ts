import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type FetchError<T> = T & FetchBaseQueryError;

type EmailNotExistError = FetchError<{
    message: 'Email не найден';
    statusCode: 404;
}>;

export const isEmailNotExistError = (
    error: FetchBaseQueryError | undefined,
): error is EmailNotExistError =>
    !!error?.data &&
    typeof error.data === 'object' &&
    'message' in error.data &&
    error.data.message === 'Email не найден' &&
    'statusCode' in error.data &&
    error.data.statusCode === 404;

export const isUserNotExistError = (error: FetchBaseQueryError | undefined) =>
    error?.status === 409;
