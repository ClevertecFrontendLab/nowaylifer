import type { AppDispatch, RootState } from './configure-store';

type AppThunkApi = {
    dispatch: AppDispatch;
    getState: () => RootState;
};

type CallbackFn<Return, Args extends unknown[]> = (api: AppThunkApi, ...args: Args) => Return;

export const createThunk =
    <Return, Args extends unknown[]>(callbackFn: CallbackFn<Return, Args>) =>
    (...args: Args) =>
    (dispatch: AppDispatch, getState: () => RootState) =>
        callbackFn({ dispatch, getState }, ...args);
