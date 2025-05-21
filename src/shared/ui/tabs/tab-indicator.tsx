import {
    chakra,
    forwardRef,
    TabIndicatorProps,
    useSafeLayoutEffect,
    useTabsContext,
    useTabsDescendantsContext,
    useTabsStyles,
} from '@chakra-ui/react';
import { cx } from '@chakra-ui/utils';
import { useResizeObserver } from '@react-hookz/web';
import { useReducer, useRef, useState } from 'react';

// mostly copied from chakra's repo to fix issue with indicator not adapting to resize of parent container
export const TabIndicator = forwardRef<TabIndicatorProps & UseTabIndicatorProps, 'div'>(
    function TabIndicator({ scrollRef, ...props }, ref) {
        const indicatorStyle = useTabIndicator({ scrollRef });
        const style = {
            ...props.style,
            ...indicatorStyle,
        };

        const styles = useTabsStyles();

        return (
            <chakra.div
                ref={ref}
                {...props}
                className={cx('chakra-tabs__tab-indicator', props.className)}
                style={style}
                __css={styles.indicator}
            />
        );
    },
);

TabIndicator.displayName = 'TabIndicator';

interface UseTabIndicatorProps {
    scrollRef: React.RefObject<HTMLDivElement | null>;
}

function useTabIndicator({ scrollRef }: UseTabIndicatorProps): React.CSSProperties {
    const context = useTabsContext();
    const descendants = useTabsDescendantsContext();

    const { selectedIndex, orientation } = context;

    const isHorizontal = orientation === 'horizontal';
    const isVertical = orientation === 'vertical';

    const [rect, setRect] = useState(() => {
        if (isHorizontal) return { left: 0, width: 0 };
        if (isVertical) return { top: 0, height: 0 };
        return {};
    });

    const [hasMeasured, setHasMeasured] = useState(false);

    const selectedTabRef = useRef<HTMLElement | null>(null);

    const measure = () => {
        if (selectedIndex == null) return;

        const tab = descendants.item(selectedIndex);
        if (!tab || !tab.node) return;

        selectedTabRef.current = tab.node;

        if (isHorizontal) {
            setRect({ left: tab.node.offsetLeft, width: tab.node.offsetWidth });
        }

        if (isVertical) {
            setRect({ top: tab.node.offsetTop, height: tab.node.offsetHeight });
        }
    };

    const [trigger, triggerMeasure] = useReducer((x) => x + 1, 0);

    useSafeLayoutEffect(() => {
        measure();
        const id = requestAnimationFrame(() => {
            setHasMeasured(true);
        });
        return () => {
            cancelAnimationFrame(id);
        };
    }, [selectedIndex, trigger, isHorizontal, isVertical, descendants]);

    useResizeObserver(scrollRef, () => {
        setHasMeasured(false);
        triggerMeasure();
    });

    return {
        position: 'absolute',
        transitionProperty: 'left, right, top, bottom, height, width',
        transitionDuration: hasMeasured ? '200ms' : '0ms',
        transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
        ...rect,
    };
}
