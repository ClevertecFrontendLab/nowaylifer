import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

export const Tabs = createMultiStyleConfigHelpers(tabsAnatomy.keys).defineMultiStyleConfig({
    defaultProps: { colorScheme: 'lime' },
    baseStyle: ({ colorScheme: c }) => ({
        tab: {
            '--tabs-color': `colors.${c}.800`,
            fontWeight: 'medium',
            whiteSpace: 'nowrap',
            borderBottomColor: 'transparent !important',
        },
        indicator: {
            bg: `${c}.600`,
        },
        tabpanels: { mt: 6 },
        tabpanel: { p: 0 },
    }),
});
