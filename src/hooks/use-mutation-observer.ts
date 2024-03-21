import { MutableRefObject, useCallback, useLayoutEffect, useRef } from 'react';

export const skipToken: unique symbol = Symbol('Skip useMutationObserver');

export const useMutationObserver = (
    target: MutableRefObject<Element | null>,
    callback: MutationCallback,
    options: MutationObserverInit & { skip?: typeof skipToken } = {},
) => {
    const observer = useRef<MutationObserver | null>(null);

    const stop = useCallback(() => {
        if (!observer.current) return;
        observer.current.disconnect();
        observer.current = null;
    }, []);

    useLayoutEffect(() => {
        const el = target.current;
        const { skip, ...observerOptions } = options;

        if (!skip && el) {
            observer.current = new MutationObserver(callback);
            observer.current.observe(el, observerOptions);
        }

        return stop;
    }, [stop, target, options, callback]);

    return stop;
};
