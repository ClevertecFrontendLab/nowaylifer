import {
    Box,
    BoxProps,
    TabIndicator,
    TabIndicatorProps,
    TabList as BaseTabList,
    TabListProps as BaseTabListProps,
    useTabsContext,
    useTabsDescendantsContext,
    useUpdateEffect,
} from '@chakra-ui/react';
import { useRef } from 'react';

import { scrollTabIntoView } from './scroll-tab-into-view';

export interface TabListProps extends BoxProps {
    children?: React.ReactNode;
    scrollable?: boolean;
    withIndicator?: boolean;
    listProps?: BaseTabListProps;
    indicatorKey?: string;
    indicatorProps?: TabIndicatorProps;
}

export const TabList = ({
    children,
    scrollable = true,
    withIndicator = true,
    indicatorProps,
    indicatorKey,
    listProps,
    sx,
    ...props
}: TabListProps) => {
    const { selectedIndex } = useTabsContext();
    const descendants = useTabsDescendantsContext();
    const scrollRef = useRef<HTMLDivElement>(null);

    useUpdateEffect(() => {
        if (!scrollable || selectedIndex == null || !scrollRef.current) return;
        const tab = descendants.item(selectedIndex);
        if (!tab) return;
        scrollTabIntoView({ container: scrollRef.current, tab: tab.node, behavior: 'smooth' });
    }, [selectedIndex, descendants, scrollable]);

    return (
        <Box
            ref={scrollRef}
            pos='relative'
            overflowX='auto'
            sx={{ scrollbarWidth: 'none', ...sx }}
            pb={1}
            {...props}
        >
            <BaseTabList mx='auto' w={scrollable ? 'max-content' : undefined} {...listProps}>
                {children}
            </BaseTabList>
            {withIndicator && (
                <TabIndicator key={indicatorKey} height='2px' mt='-1.5px' {...indicatorProps} />
            )}
        </Box>
    );
};
