import { createSlice } from '@reduxjs/toolkit';

import { QueryHttpError } from '~/shared/api';

export interface ErrorMeta {
    errorId?: string | number | ((error: QueryHttpError) => string | number);
    title: string;
    description?: string;
}

export interface LoggableError {
    id: string | number;
    meta: ErrorMeta | null;
    error: QueryHttpError;
    endpoint: string;
}

export interface ErrorLoggerState {
    loggableError: LoggableError | null;
}

const initialState: ErrorLoggerState = {
    loggableError: null,
};

export const errorLoggerSlice = createSlice({
    name: 'errorLogger',
    initialState,
    reducers: (create) => ({
        setLoggableError: create.reducer<LoggableError | null>((state, action) => {
            state.loggableError = action.payload;
        }),
    }),
});

export const { setLoggableError } = errorLoggerSlice.actions;
