import { useEffect } from 'react';

import { useAppLoader } from './use-app-loader';

export const AppLoader = ({ open }: { open: boolean }) => {
    const appLoader = useAppLoader();

    useEffect(() => {
        if (open) {
            appLoader.open();
        } else {
            appLoader.close();
        }

        return () => appLoader.close();
    }, [appLoader, open]);

    return null;
};
