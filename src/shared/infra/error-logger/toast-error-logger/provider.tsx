import { PropsWithChildren, useEffect, useMemo } from 'react';

import { useAppSelector } from '~/shared/store';

import { ToastOptions, useToast } from '../../toast';
import { ToastErrorLoggerContextProvider } from './context';

const toastOptions: ToastOptions = {
    isAnchored: true,
};

export const ToastErrorLoggerProvider = (props: PropsWithChildren) => {
    const error = useAppSelector((state) => state.errorLogger.loggableError);
    const { anchorRef, toast } = useToast(toastOptions);
    const ctx = useMemo(() => ({ anchorRef }), [anchorRef]);

    useEffect(() => {
        if (error?.meta && !toast.isActive(`api-error-id-${error.id}`)) {
            toast({
                id: `api-error-id-${error.id}`,
                status: 'error',
                ...error.meta,
            });
        }
    }, [error, toast]);

    return <ToastErrorLoggerContextProvider value={ctx} {...props} />;
};
