import { createContext, Fragment, PropsWithChildren, useMemo, useState } from 'react';
import { LoaderModal } from '@components/loader-modal';

type AppLoaderContext = { open: () => void; close: () => void };

export const AppLoaderContext = createContext<AppLoaderContext | null>(null);

export const AppLoaderProvider = (props: PropsWithChildren) => {
    const [showLoader, setShowLoader] = useState(false);

    const context: AppLoaderContext = useMemo(
        () => ({
            open: () => setShowLoader(true),
            close: () => setShowLoader(false),
        }),
        [],
    );

    return (
        <Fragment>
            <LoaderModal open={showLoader} />
            <AppLoaderContext.Provider value={context} {...props} />
        </Fragment>
    );
};
