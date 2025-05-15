import {
    TabIndicator as BaseTabIndicator,
    TabIndicatorProps,
    useTabsContext,
    useTabsDescendantsContext,
} from '@chakra-ui/react';
import { useResizeObserver } from '@react-hookz/web';
import { useEffect, useReducer, useRef } from 'react';

export const TabIndicator = (props: TabIndicatorProps) => {
    const [renderCount, forceRender] = useReducer((x) => x + 1, 0);
    const selectedRef = useRef<HTMLElement>(null);
    const prevWidth = useRef<number>(undefined);

    const { selectedIndex } = useTabsContext();
    const descendants = useTabsDescendantsContext();

    useEffect(() => {
        const item = descendants.item(selectedIndex);
        if (item) {
            selectedRef.current = item.node;
        } else {
            selectedRef.current = null;
        }
    }, [selectedIndex, descendants]);

    useResizeObserver(selectedRef, (entry) => {
        if (entry.borderBoxSize[0].inlineSize !== prevWidth.current) {
            prevWidth.current = entry.borderBoxSize[0].inlineSize;
            forceRender();
        }
    });

    return <BaseTabIndicator key={renderCount} {...props} />;
};
