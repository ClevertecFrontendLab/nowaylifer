import { useDeepCompareEffect } from '@react-hookz/web';
import { useRef } from 'react';
import { useLocation } from 'react-router';

export interface UseScrollToHashProps extends ScrollIntoViewOptions {
    enabled?: boolean;
}

export const useScrollToHash = (options: UseScrollToHashProps = {}) => {
    const { enabled, ...scrollOptions } = options;
    const hasScrolledRef = useRef(false);
    const { hash } = useLocation();

    useDeepCompareEffect(() => {
        if (!hash || !enabled || hasScrolledRef.current) return;

        const id = hash.slice(1);
        const el = document.getElementById(id);

        if (el) {
            el.scrollIntoView(scrollOptions);
            hasScrolledRef.current = true;
        }
    }, [enabled, scrollOptions]);
};
