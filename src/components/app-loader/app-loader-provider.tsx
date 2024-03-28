import { createContext, Fragment, PropsWithChildren, useMemo, useState } from 'react';
import { LoaderModal } from '@components/loader-modal';

type AppLoaderContext = { open: () => void; close: () => void };

export const AppLoaderContext = createContext<AppLoaderContext | null>(null);

export const AppLoaderProvider = (props: PropsWithChildren) => {
    const [stack, setStack] = useState<boolean[]>([]);

    const context: AppLoaderContext = useMemo(
        () => ({
            open: () => setStack((prev) => [...prev, true]),
            close: () => setStack((prev) => prev.slice(0, -1)),
        }),
        [],
    );

    return (
        <Fragment>
            <LoaderModal open={!!stack.length} />
            <AppLoaderContext.Provider value={context} {...props} />
        </Fragment>
    );
};
