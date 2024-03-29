import { replace } from 'redux-first-history';
import { BACKEND_URL } from '@constants/config';
import { createThunk } from '@redux/create-thunk';
import { createAction } from '@reduxjs/toolkit';
import { RoutePath } from '@router/paths';
import { capitalize } from '@utils/capitalize';
import { concat } from '@utils/concat';

import { sliceName } from './config';
import type { ResultStatus } from './types';
import { type AuthSliceState, setRememberGoogleAuth, setToken } from '.';

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

export const untypedMutationRetried = createAction<MutationRetriedPayload>(
    `${sliceName}/mutationRetried`,
);

export const mutationRetried = <T extends RetryMutation>(mutation: T, data: RetryData<T>) =>
    untypedMutationRetried({ retryField: concat('retry', capitalize(mutation)), data });

export const cleanMutationRetry = createAction(
    `${sliceName}/cleanMutationRetry`,
    (mutation: RetryMutation) => ({ payload: concat('retry', capitalize(mutation)) }),
);

export const redirectFromAuthResult = createAction<ResultStatus>(
    `${sliceName}/redirectFromAuthResult`,
);

export const logout = createThunk(({ dispatch }) => {
    dispatch(setToken(null));
    dispatch(replace(RoutePath.Login));
});

export const loginViaGoogle = createThunk(({ dispatch }, remember: boolean) => {
    dispatch(setRememberGoogleAuth(remember));
    window.location.href = `${BACKEND_URL}/auth/google`;
});
