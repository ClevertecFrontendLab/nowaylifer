import { createContext, Fragment, PropsWithChildren, useMemo, useState } from 'react';
import { LoaderModal } from '@components/loader-modal';

type AppLoaderContext = { open: (id?: string) => void; close: (id?: string) => void };

export const AppLoaderContext = createContext<AppLoaderContext | null>(null);

export const AppLoaderProvider = (props: PropsWithChildren) => {
    const [consumers, setConsumers] = useState<Array<string | true>>([]);

    const context: AppLoaderContext = useMemo(
        () => ({
            open: (id?: string) => setConsumers((prev) => [...prev, id ?? true]),
            close: (id?: string) => {
                if (id) {
                    setConsumers((prev) => prev.filter((v) => v !== id));
                } else {
                    setConsumers((prev) => {
                        const lastTrueIdx = prev.lastIndexOf(true);

                        return prev.slice(0, lastTrueIdx).concat(prev.slice(lastTrueIdx + 1));
                    });
                }
            },
        }),
        [],
    );

    return (
        <Fragment>
            <LoaderModal open={!!consumers.length} />
            <AppLoaderContext.Provider value={context} {...props} />
        </Fragment>
    );
};
