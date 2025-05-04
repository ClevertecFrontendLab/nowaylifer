import { useMemo } from 'react';

import { useAppDispatch, useAppSelector, useAppStore } from '~/shared/store';

import { AppLoaderSpinner } from './AppLoaderSpinner';
import { AppLoaderContext, AppLoaderContextProvider } from './context';
import { selectIsAppLoaderRunning, slice } from './slice';

export const AppLoaderProvider = ({ children }: React.PropsWithChildren) => {
    const isRunning = useAppSelector(selectIsAppLoaderRunning);
    const dispatch = useAppDispatch();
    const store = useAppStore();

    const ctx: AppLoaderContext = useMemo(
        () => ({
            start: (id) => dispatch(slice.actions.start(id)),
            stop: (id) => dispatch(slice.actions.stop(id)),
            stopAll: () => dispatch(slice.actions.stopAll()),
            isRunning: (id) => selectIsAppLoaderRunning(store.getState(), id),
        }),
        [dispatch, store],
    );

    return (
        <AppLoaderContextProvider value={ctx}>
            {isRunning && <AppLoaderSpinner />}
            {children}
        </AppLoaderContextProvider>
    );
};
