import { useUnmountEffect } from '@react-hookz/web';
import { useEffect, useId } from 'react';

import { useAppLoader } from './context';

export const useShowAppLoader = (enabled: boolean) => {
    const loader = useAppLoader();
    const id = useId();

    useEffect(() => {
        if (enabled) {
            loader.start(id);
        } else if (loader.isRunning(id)) {
            loader.stop(id);
        }
    }, [enabled, loader, id]);

    useUnmountEffect(() => {
        if (loader.isRunning(id)) {
            loader.stop(id);
        }
    });
};
