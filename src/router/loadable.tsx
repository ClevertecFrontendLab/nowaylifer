/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { AppLoader } from '@components/app-loader';
import { ComponentProps, ComponentType, ReactNode } from 'react';
import { Suspense as SuspenseNoFlicker, lazy as lazyNoFlicker } from 'react-lazy-no-flicker';

const delay = 50;

type LazyOptions = Parameters<typeof lazyNoFlicker>[1];

const lazy = <T extends ComponentType<any>>(
    factory: () => Promise<{ default: T }>,
    options?: LazyOptions,
) =>
    lazyNoFlicker(factory, {
        minimum_fallback_time: 1000,
        time_before_fallback: delay,
        ...options,
    });

const Suspense = (props: ComponentProps<typeof SuspenseNoFlicker>) => (
    <SuspenseNoFlicker delay={delay} {...props} />
);

type LoadableOptions = LazyOptions & {
    fallback?: ReactNode;
};

export const loadable = <T extends ComponentType<any>>(
    factory: () => Promise<{ default: T }>,
    { fallback, ...lazyOptions }: LoadableOptions = { fallback: <AppLoader open={true} /> },
) => {
    const LazyComponent = lazy(factory, lazyOptions);

    return (props: ComponentProps<T>) => (
        <Suspense fallback={fallback}>
            <LazyComponent {...props} />
        </Suspense>
    );
};
