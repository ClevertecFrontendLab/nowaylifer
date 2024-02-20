import { createContext, useContext, useEffect } from 'react';

export type AuthLoaderContext = ((value: boolean) => void) | null;
export const AuthLoaderContext = createContext<AuthLoaderContext>(null);

export const useAuthLoader = (signal: boolean) => {
    const onLoading = useContext(AuthLoaderContext);

    if (!onLoading) throw new Error('Out of AuthLoader context');

    useEffect(() => {
        onLoading(signal);
    }, [signal, onLoading]);
};
