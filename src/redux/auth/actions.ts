import { BACKEND_URL } from '@constants/config';
import { createThunk } from '@redux/create-thunk';
import { createAction } from '@reduxjs/toolkit';
import { Path } from '@router/paths';
import { capitalize } from '@utils/capitalize';
import { concat } from '@utils/concat';
import { replace } from 'redux-first-history';
import { setRememberGoogleAuth, setToken, type AuthSliceState } from '.';
import { sliceName } from './config';
import type { ResultStatus } from './types';

type RetryFieldUnion = {
    [K in keyof AuthSliceState]: K extends `retry${string}` ? K : never;
}[keyof AuthSliceState];

type RetryMutation = {
    [K in RetryFieldUnion]: K extends `retry${infer M}` ? Uncapitalize<M> : never;
}[RetryFieldUnion];

type RetryData<T extends RetryMutation | RetryFieldUnion> = Extract<
    AuthSliceState[T extends RetryMutation ? `retry${Capitalize<T>}` : T],
    { data: unknown }
>['data'];

type MutationRetriedPayload = {
    retryField: RetryFieldUnion;
    data: RetryData<RetryFieldUnion>;
};

export const _untypedMutationRetried = createAction<MutationRetriedPayload>(
    `${sliceName}/mutationRetried`,
);

export const mutationRetried = <T extends RetryMutation>(mutation: T, data: RetryData<T>) =>
    _untypedMutationRetried({ retryField: concat('retry', capitalize(mutation)), data });

export const cleanMutationRetry = createAction(
    `${sliceName}/cleanMutationRetry`,
    (mutation: RetryMutation) => ({ payload: concat('retry', capitalize(mutation)) }),
);

export const redirectFromAuthResult = createAction<ResultStatus>(
    `${sliceName}/redirectFromAuthResult`,
);

export const logout = createThunk(({ dispatch }) => {
    dispatch(setToken(null));
    dispatch(replace(Path.Login));
});

export const loginViaGoogle = createThunk(({ dispatch }, remember: boolean) => {
    dispatch(setRememberGoogleAuth(remember));
    window.location.href = BACKEND_URL + '/auth/google';
});
