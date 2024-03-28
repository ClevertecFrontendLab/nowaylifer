import { useEffect, useRef } from 'react';

import { useAppLoader } from './use-app-loader';

export const AppLoader = ({ open }: { open: boolean }) => {
    const appLoader = useAppLoader();
    const prevOpen = useRef(open);

    useEffect(() => {
        prevOpen.current = open;
    }, [open]);

    useEffect(() => {
        if (open) {
            appLoader.open();
        } else if (!open && prevOpen.current) {
            appLoader.close();
        }

        return () => appLoader.close();
    }, [appLoader, open]);

    return null;
};
