import { useResizeObserver } from '@react-hookz/web';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

// item index -> wrap order (0-based)
type WrapIndexMap = Map<number, number>;

const emptyMap: WrapIndexMap = new Map();

/**
 * Hook to detect when child items within a container element wrap onto a new line.
 *
 * @param deps - An array of dependencies that will trigger re-measurement when changed.
 * @param enabled - Whether the hook is enabled or not.
 *
 */
export const useDetectWrap = <
    ContainerEl extends HTMLElement = HTMLElement,
    ItemEl extends HTMLElement = HTMLElement,
>(
    deps: unknown[] = [],
    enabled = true,
) => {
    const [wrapIndexMap, setWrapIndexMap] = useState<WrapIndexMap>(emptyMap);
    const containerRef = useRef<ContainerEl | null>(null);
    const [measured, setMeasured] = useState(false);
    const itemRefs = useRef<(ItemEl | null)[]>([]);

    const setItemRef = (index: number) => (el: ItemEl | null) => {
        itemRefs.current[index] = el;
    };

    const detectWraps = useCallback(() => {
        const items = itemRefs.current;
        const newMap: WrapIndexMap = new Map();
        let lastTop: number | null = null;

        items.forEach((item, i) => {
            if (!item) return;
            const top = item.offsetTop;
            if (lastTop !== null && top > lastTop) {
                newMap.set(i, newMap.size);
            }
            lastTop = top;
        });

        setWrapIndexMap(newMap);
    }, []);

    useLayoutEffect(() => {
        if (enabled) {
            setMeasured(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled, ...deps]);

    useLayoutEffect(() => {
        if (enabled && !measured) {
            detectWraps();
            setMeasured(true);
        }
    }, [enabled, detectWraps, measured]);

    useResizeObserver(containerRef, detectWraps, enabled);

    const map = measured ? wrapIndexMap : emptyMap;

    const wrapInfo = (index: number) => ({
        isWrapped: map.has(index),
        wrapOrder: map.get(index) ?? -1,
    });

    return {
        containerRef,
        setItemRef,
        wrapInfo,
        wrapIndexMap: map,
    };
};
