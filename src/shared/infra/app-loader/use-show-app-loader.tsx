import { useUnmountEffect } from '@react-hookz/web';
import { useEffect, useId } from 'react';

import { useAppLoader } from './context';

export const useShowAppLoader = (enabled: boolean, withOverlay?: boolean) => {
    const loader = useAppLoader();
    const id = useId();

    useEffect(() => {
        if (enabled && !loader.isRunning(id)) {
            loader.start(id, withOverlay);
        } else if (loader.isRunning(id)) {
            loader.stop(id);
        }
    }, [enabled, loader, id, withOverlay]);

    useUnmountEffect(() => {
        if (loader.isRunning(id)) {
            loader.stop(id);
        }
    });
};
