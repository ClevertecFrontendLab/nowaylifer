import { useEffect, useRef } from 'react';

import { useAppDispatch } from '~/shared/store';

import { startAppLoader, stopAppLoader } from './slice';

export const useAppLoader = (enabled: boolean, withOverlay = true) => {
    const prevRef = useRef({ enabled: false, withOverlay });
    const dispatch = useAppDispatch();

    useEffect(() => {
        const { enabled: prevEnabled, withOverlay: prevWithOverlay } = prevRef.current;

        if (enabled && !prevEnabled) {
            dispatch(startAppLoader(withOverlay));
        }

        if (!enabled && prevEnabled) {
            dispatch(stopAppLoader());
        }

        if (enabled && withOverlay !== prevWithOverlay) {
            dispatch(stopAppLoader());
            dispatch(startAppLoader(withOverlay));
        }

        prevRef.current = { enabled, withOverlay };

        return () => {
            if (prevRef.current.enabled) {
                prevRef.current.enabled = false;
                dispatch(stopAppLoader());
            }
        };
    }, [enabled, withOverlay, dispatch]);
};
