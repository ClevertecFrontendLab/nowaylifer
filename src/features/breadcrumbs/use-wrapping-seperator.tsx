import { useResizeObserver } from '@react-hookz/web';
import { useCallback, useLayoutEffect, useRef } from 'react';

export const useWrappingSeparator = <
    ContainerEl extends HTMLElement = HTMLElement,
    ItemEl extends HTMLElement = HTMLElement,
    SeparatorEl extends HTMLElement = HTMLElement,
>(
    offset = 8,
    deps: unknown[] = [],
    enabled = true,
) => {
    const itemRefs = useRef<(ItemEl | null)[]>([]);
    const separatorRefs = useRef<(SeparatorEl | null)[]>([]);
    const containerRef = useRef<ContainerEl | null>(null);

    const setItemRef = (index: number) => (el: ItemEl | null) => {
        itemRefs.current[index] = el;
    };

    const setSeparatorRef = (index: number) => (el: SeparatorEl | null) => {
        separatorRefs.current[index] = el;
    };

    const updateSeparators = useCallback(() => {
        const items = itemRefs.current;
        const separators = separatorRefs.current;

        const hide: SeparatorEl[] = [];
        const show: SeparatorEl[] = [];

        let lastTop: number | null = null;

        items.forEach((item, i) => {
            const top = item?.offsetTop;
            const separator = separators[i];

            if (!item || !separator || top == null) return;

            if (lastTop !== null && top > lastTop) {
                show.push(separator);
            } else {
                hide.push(separator);
            }

            lastTop = top;
        });

        hide.forEach((el) => {
            el.style.display = 'none';
            el.style.marginLeft = '0px';
        });

        show.forEach((el, i) => {
            el.style.display = 'revert';
            el.style.marginLeft = `${i * offset}px`;
        });
    }, [offset]);

    useLayoutEffect(() => {
        if (enabled) updateSeparators();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled, updateSeparators, ...deps]);

    useResizeObserver(containerRef, updateSeparators, enabled);

    return {
        containerRef,
        setItemRef,
        setSeparatorRef,
    };
};
