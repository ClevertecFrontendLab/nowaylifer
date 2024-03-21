import { push, replace } from 'redux-first-history';
import { createThunk } from '@redux/create-thunk';
import { startAppListening } from '@redux/listener-middleware';
import { type UnknownAction, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { RoutePath } from '@router/paths';

import { cleanMutationRetry, mutationRetried, redirectFromAuthResult } from './actions';
import { authApi } from './api';
import { setAuthFrom, setAuthLoading, setEmailToConfirm, setToken } from './slice';
import { isEmailNotExistError, isUserNotExistError } from './type-guards';
import type { ResultStatus } from './types';

const redirectAfterLogin = createThunk((api) => {
    const location = api.getState().auth.authFrom ?? RoutePath.Main;

    api.dispatch(replace(location));
    api.dispatch(setAuthFrom(null));
});

const redirectToAuthResult = createThunk((api, status: ResultStatus) => {
    api.dispatch(push(`${RoutePath.Result}/${status}`, { from: api.getState().router.location }));
});

const isRedirectFromAuthResult = (resultStatus: ResultStatus) => (action: UnknownAction) => {
    if (redirectFromAuthResult.match(action)) {
        return action.payload === resultStatus;
    }

    return false;
};

const redirectAndWaitForReturn = createThunk(({ dispatch }, to: ResultStatus) => {
    dispatch(redirectToAuthResult(to));

    return isRedirectFromAuthResult(to);
});

startAppListening({
    predicate: (action) => action.type.startsWith(authApi.reducerPath) && isPending(action),
    effect: (_, { dispatch }) => {
        dispatch(setAuthLoading(true));
    },
});

startAppListening({
    predicate: (action) =>
        (action.type.startsWith(authApi.reducerPath) && isFulfilled(action)) || isRejected(action),
    effect: (_, { dispatch }) => {
        dispatch(setAuthLoading(false));
    },
});

/**
 * Login flow
 */

startAppListening({
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: ({ payload, meta }, { dispatch }) => {
        const token = payload.accessToken;
        const { remember } = meta.arg.originalArgs;

        dispatch(setToken({ token, remember }));
        dispatch(redirectAfterLogin());
    },
});

startAppListening({
    matcher: authApi.endpoints.login.matchRejected,
    effect: async (_, { dispatch, condition }) => {
        await condition(dispatch(redirectAndWaitForReturn('error-login')));
        dispatch(replace(RoutePath.Login));
    },
});

/**
 * Registration flow
 */

startAppListening({
    matcher: authApi.endpoints.register.matchFulfilled,
    effect: async (_, { dispatch, condition }) => {
        await condition(dispatch(redirectAndWaitForReturn('success')));
        dispatch(replace(RoutePath.Login));
        dispatch(cleanMutationRetry('register'));
    },
});

startAppListening({
    matcher: authApi.endpoints.register.matchRejected,
    effect: async ({ meta, payload }, { dispatch, condition }) => {
        dispatch(cleanMutationRetry('register'));

        if (isUserNotExistError(payload)) {
            await condition(dispatch(redirectAndWaitForReturn('error-user-exist')));
            dispatch(dispatch(replace(RoutePath.Register)));

            return;
        }

        await condition(dispatch(redirectAndWaitForReturn('error')));

        const credentials = meta.arg.originalArgs;

        dispatch(mutationRetried('register', credentials));
        dispatch(replace(RoutePath.Register));
    },
});

/**
 * Reset password flow
 */

startAppListening({
    matcher: authApi.endpoints.checkEmail.matchFulfilled,
    effect: (action, { dispatch, getState }) => {
        const email = action.meta.arg.originalArgs;

        dispatch(setEmailToConfirm(email));
        dispatch(push(RoutePath.ConfirmEmail, { from: getState().router.location }));
        dispatch(cleanMutationRetry('checkEmail'));
    },
});

startAppListening({
    matcher: authApi.endpoints.checkEmail.matchRejected,
    effect: async ({ payload, meta }, { dispatch, condition }) => {
        dispatch(cleanMutationRetry('checkEmail'));

        if (isEmailNotExistError(payload)) {
            await condition(dispatch(redirectAndWaitForReturn('error-check-email-no-exist')));
            dispatch(replace(RoutePath.Login));

            return;
        }

        await condition(dispatch(redirectAndWaitForReturn('error-check-email')));

        const email = meta.arg.originalArgs;

        dispatch(mutationRetried('checkEmail', email));
        dispatch(replace(RoutePath.Login));
    },
});

startAppListening({
    matcher: authApi.endpoints.confirmEmail.matchFulfilled,
    effect: (_, { dispatch, getState }) => {
        dispatch(replace(RoutePath.ChangePassword, { from: getState().router.location }));
    },
});

startAppListening({
    matcher: authApi.endpoints.changePassword.matchFulfilled,
    effect: async (_, { dispatch, condition }) => {
        await condition(dispatch(redirectAndWaitForReturn('success-change-password')));
        dispatch(replace(RoutePath.Login));
        dispatch(cleanMutationRetry('changePassword'));
    },
});

startAppListening({
    matcher: authApi.endpoints.changePassword.matchRejected,
    effect: async ({ meta }, { dispatch, condition, getState }) => {
        await condition(dispatch(redirectAndWaitForReturn('error-change-password')));
        const changePasswordPayload = meta.arg.originalArgs;

        dispatch(mutationRetried('changePassword', changePasswordPayload));
        dispatch(replace(RoutePath.ChangePassword, { from: getState().router.location }));
    },
});
