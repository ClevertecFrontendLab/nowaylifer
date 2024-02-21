import { createContext, useContext, useEffect } from 'react';

export type AuthLoaderContext = ((value: boolean) => void) | null;
export const AuthLoaderContext = createContext<AuthLoaderContext>(null);

export const useAuthLoader = (...signals: boolean[]) => {
    const onLoading = useContext(AuthLoaderContext);

    if (!onLoading) throw new Error('Out of AuthLoader context');

    useEffect(() => {
        onLoading(signals.some(Boolean));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onLoading, ...signals]);
};
