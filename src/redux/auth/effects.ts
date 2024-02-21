import { replace, push } from 'redux-first-history';
import { startAppListening } from '@redux/listener-middleware';
import type { AppThunk } from '@redux/configure-store';
import { Path } from '@router/paths';
import { setAuthFrom, setRetryRegister, setToken } from './slice';
import { authApi } from './api';
import type { ResultStatus } from 'src/types';
import { redirectFromAuthResult } from './slice';

const redirectAfterLogin = (): AppThunk => (dispatch, getState) => {
    const location = getState().auth.authFrom ?? Path.Main;
    dispatch(replace(location));
    dispatch(setAuthFrom(null));
};

const redirectToAuthResult =
    (status: ResultStatus): AppThunk =>
    (dispatch, getState) => {
        dispatch(push(Path.Result + `/${status}`, { from: getState().router.location }));
    };

const removeRetryRegister = (): AppThunk => (dispatch, getState) => {
    if (getState().auth.retryRegister) {
        dispatch(setRetryRegister(null));
    }
};

startAppListening({
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: (action, api) => {
        const token = action.payload.accessToken;
        const remember = action.meta.arg.originalArgs.remember;
        api.dispatch(setToken({ token, remember }));
        api.dispatch(redirectAfterLogin());
    },
});

startAppListening({
    matcher: authApi.endpoints.login.matchRejected,
    effect: (_, api) => api.dispatch(redirectToAuthResult('error-login')),
});

startAppListening({
    matcher: authApi.endpoints.register.matchFulfilled,
    effect: (_, api) => {
        api.dispatch(redirectToAuthResult('success'));
        api.dispatch(removeRetryRegister());
    },
});

startAppListening({
    matcher: authApi.endpoints.register.matchRejected,
    effect: async ({ meta, payload }, api) => {
        api.dispatch(removeRetryRegister());

        if (payload?.status === 409) {
            return api.dispatch(redirectToAuthResult('error-user-exist'));
        }

        const credentials = meta.arg.originalArgs;
        api.dispatch(redirectToAuthResult('error'));

        await api.condition((action) => {
            if (redirectFromAuthResult.match(action)) {
                return action.payload === 'error';
            }
            return false;
        });

        api.dispatch(setRetryRegister(credentials));
        api.dispatch(replace(Path.Register));
    },
});

startAppListening({
    actionCreator: redirectFromAuthResult,
    effect: ({ payload }, { dispatch }) => {
        switch (payload) {
            case 'success':
            case 'error-login':
                dispatch(replace(Path.Login));
                break;
            case 'error-user-exist':
                dispatch(replace(Path.Register));
                break;
            default:
                break;
        }
    },
});

/* startAppListening({
    matcher: authApi.endpoints.checkEmail.matchFulfilled,
    effect: () => {},pia
}); */
