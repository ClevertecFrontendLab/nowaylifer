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
    centered?: boolean;
}

export const TabList = ({
    children,
    centered,
    scrollable,
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
            overflowX={scrollable ? 'auto' : 'visible'}
            sx={{ scrollbarWidth: 'none', ...sx }}
            pb={1}
            {...props}
        >
            <BaseTabList
                w={scrollable ? 'max-content' : 'full'}
                mx={centered ? 'auto' : undefined}
                {...listProps}
            >
                {children}
            </BaseTabList>
            {withIndicator && (
                <TabIndicator key={indicatorKey} height='2px' mt='-1.5px' {...indicatorProps} />
            )}
        </Box>
    );
};
