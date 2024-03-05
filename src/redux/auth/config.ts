import { PersistConfig as _PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import type { AuthSliceState } from '.';

type PersistConfig<S> = _PersistConfig<S> & {
    whitelist?: Array<keyof S>;
    blacklist?: Array<keyof S>;
};

export const sliceName = 'auth';

export const authSlicePersistConfig: PersistConfig<AuthSliceState> = {
    key: sliceName,
    storage,
    whitelist: ['_persistedToken', 'emailToConfirm', 'rememberGoogleAuth'],
};
