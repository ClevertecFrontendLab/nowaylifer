import { replace, push } from 'redux-first-history';
import type { ResultStatus } from '@pages/auth-result-page/result-config';
import type { LocationWithState } from '@hooks/use-app-location';
import type { AppThunk } from '@redux/configure-store';
import { Path } from '@router/paths';

export const redirectAfterLogin = (): AppThunk => (dispatch, getState) => {
    const location = getState().router.location as LocationWithState;
    const from = location.state?.from;
    dispatch(replace(from ?? Path.Main));
};

export const redirectToAuthResult =
    (status: ResultStatus, state?: Record<string, unknown>): AppThunk =>
    (dispatch, getState) => {
        dispatch(push(Path.Result + `/${status}`, { from: getState().router.location, ...state }));
    };
