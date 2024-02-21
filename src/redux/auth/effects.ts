import { replace, push } from 'redux-first-history';
import { startAppListening } from '@redux/listener-middleware';
import { Path } from '@router/paths';
import {
    setAuthFrom,
    registerRetried,
    setToken,
    checkEmailRetried,
    cleanRegisterRetry,
    cleanCheckEmailRetry,
} from './slice';
import { authApi } from './api';
import type { ResultStatus } from 'src/types';
import { redirectFromAuthResult } from './slice';
import { isEmailNotExistError, isUserNotExistError } from './type-guards';
import type { UnknownAction } from '@reduxjs/toolkit';
import { createThunk } from '@redux/create-thunk';

const redirectAfterLogin = createThunk((api) => {
    const location = api.getState().auth.authFrom ?? Path.Main;
    api.dispatch(replace(location));
    api.dispatch(setAuthFrom(null));
});

const redirectToAuthResult = createThunk((api, status: ResultStatus) => {
    api.dispatch(push(Path.Result + `/${status}`, { from: api.getState().router.location }));
});

const isRedirectFromAuthResult = (resultStatus: ResultStatus) => (action: UnknownAction) => {
    if (redirectFromAuthResult.match(action)) {
        return action.payload === resultStatus;
    }
    return false;
};

const redirectAndWaitForComeback = createThunk(({ dispatch }, to: ResultStatus) => {
    dispatch(redirectToAuthResult(to));
    return isRedirectFromAuthResult(to);
});

/**
 * Login flow
 */

startAppListening({
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: ({ payload, meta }, { dispatch }) => {
        const token = payload.accessToken;
        const remember = meta.arg.originalArgs.remember;
        dispatch(setToken({ token, remember }));
        dispatch(redirectAfterLogin());
    },
});

startAppListening({
    matcher: authApi.endpoints.login.matchRejected,
    effect: async (_, { dispatch, condition }) => {
        await condition(dispatch(redirectAndWaitForComeback('error-login')));
        dispatch(replace(Path.Login));
    },
});

/**
 * Registration flow
 */

startAppListening({
    matcher: authApi.endpoints.register.matchFulfilled,
    effect: async (_, { dispatch, condition }) => {
        await condition(dispatch(redirectAndWaitForComeback('success')));
        dispatch(replace(Path.Login));
        dispatch(cleanRegisterRetry());
    },
});

startAppListening({
    matcher: authApi.endpoints.register.matchRejected,
    effect: async ({ meta, payload }, { dispatch, condition }) => {
        dispatch(cleanRegisterRetry());

        if (isUserNotExistError(payload)) {
            await condition(dispatch(redirectAndWaitForComeback('error-user-exist')));
            dispatch(dispatch(replace(Path.Register)));
            return;
        }

        await condition(dispatch(redirectAndWaitForComeback('error')));

        const credentials = meta.arg.originalArgs;
        dispatch(registerRetried(credentials));
        dispatch(replace(Path.Register));
    },
});

/**
 * Reset password flow
 */

startAppListening({
    matcher: authApi.endpoints.checkEmail.matchFulfilled,
    effect: (_, api) => {
        api.dispatch(push(Path.ConfirmEmail, { from: api.getState().router.location }));
        api.dispatch(cleanCheckEmailRetry());
    },
});

startAppListening({
    matcher: authApi.endpoints.checkEmail.matchRejected,
    effect: async ({ payload, meta }, { dispatch, condition }) => {
        dispatch(cleanCheckEmailRetry());

        if (isEmailNotExistError(payload)) {
            await condition(dispatch(redirectAndWaitForComeback('error-check-email-no-exist')));
            dispatch(replace(Path.Login));
            return;
        }

        await condition(dispatch(redirectAndWaitForComeback('error-check-email')));

        const email = meta.arg.originalArgs;
        dispatch(checkEmailRetried(email));
        dispatch(replace(Path.Login));
    },
});
