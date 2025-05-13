import { UseToastOptions } from '@chakra-ui/react';
import { useEffect, useMemo, useRef } from 'react';

import { useAppSelector } from '~/shared/store';

import { toast } from '../toast';
import { ToastErrorLoggerContextProvider } from './context';

export const ToastErrorLoggerProvider = ({ children }: { children?: React.ReactNode }) => {
    const error = useAppSelector((state) => state.errorLogger.loggableError);
    const optionsRef = useRef<UseToastOptions>(null);

    useEffect(() => {
        setTimeout(() => {
            if (error && error.meta) {
                toast({
                    id: 'apiError',
                    status: 'error',
                    ...error.meta,
                    ...optionsRef.current,
                });
            }
        });
    }, [error]);

    const ctx = useMemo(
        () => ({
            setToastOptions: (options: UseToastOptions | null) => (optionsRef.current = options),
        }),
        [],
    );

    return (
        <ToastErrorLoggerContextProvider value={ctx}>{children}</ToastErrorLoggerContextProvider>
    );
};
