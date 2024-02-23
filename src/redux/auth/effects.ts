import { replace, push } from 'redux-first-history';
import { startAppListening } from '@redux/listener-middleware';
import { Path } from '@router/paths';
import { setAuthFrom, setToken, setAuthLoading, setEmailToConfirm } from './slice';
import { authApi } from './api';
import type { ResultStatus } from 'src/types';
import { isEmailNotExistError, isUserNotExistError } from './type-guards';
import { isFulfilled, isPending, isRejected, type UnknownAction } from '@reduxjs/toolkit';
import { createThunk } from '@redux/create-thunk';
import { cleanMutationRetry, mutationRetried, redirectFromAuthResult } from './actions';

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
        dispatch(cleanMutationRetry('register'));
    },
});

startAppListening({
    matcher: authApi.endpoints.register.matchRejected,
    effect: async ({ meta, payload }, { dispatch, condition }) => {
        dispatch(cleanMutationRetry('register'));

        if (isUserNotExistError(payload)) {
            await condition(dispatch(redirectAndWaitForComeback('error-user-exist')));
            dispatch(dispatch(replace(Path.Register)));
            return;
        }

        await condition(dispatch(redirectAndWaitForComeback('error')));

        const credentials = meta.arg.originalArgs;
        dispatch(mutationRetried('register', credentials));
        dispatch(replace(Path.Register));
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
        dispatch(push(Path.ConfirmEmail, { from: getState().router.location }));
        dispatch(cleanMutationRetry('checkEmail'));
    },
});

startAppListening({
    matcher: authApi.endpoints.checkEmail.matchRejected,
    effect: async ({ payload, meta }, { dispatch, condition }) => {
        dispatch(cleanMutationRetry('checkEmail'));

        if (isEmailNotExistError(payload)) {
            await condition(dispatch(redirectAndWaitForComeback('error-check-email-no-exist')));
            dispatch(replace(Path.Login));
            return;
        }

        await condition(dispatch(redirectAndWaitForComeback('error-check-email')));

        const email = meta.arg.originalArgs;
        dispatch(mutationRetried('checkEmail', email));
        dispatch(replace(Path.Login));
    },
});

startAppListening({
    matcher: authApi.endpoints.confirmEmail.matchFulfilled,
    effect: (_, { dispatch, getState }) => {
        dispatch(push(Path.ChangePassword, { from: getState().router.location }));
    },
});
