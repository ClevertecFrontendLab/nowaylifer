import { tabsAnatomy } from '@chakra-ui/anatomy';
import {
    createMultiStyleConfigHelpers,
    extendTheme,
    Theme as DefaultTheme,
    ThemeOverride,
} from '@chakra-ui/react';

import { dishCardTheme } from '~/shared/ui/DishCard/DishCard.theme';

const themeOverride = {
    components: {
        DishCard: dishCardTheme,
        Link: {
            baseStyle: {
                _hover: {
                    textDecoration: 'none',
                },
            },
        },
        Tabs: createMultiStyleConfigHelpers(tabsAnatomy.keys).defineMultiStyleConfig({
            defaultProps: { colorScheme: 'lime' },
            baseStyle: ({ colorScheme }) => ({
                tab: {
                    '--tabs-color': `colors.${colorScheme}.800`,
                    fontWeight: 'medium',
                    whiteSpace: 'nowrap',
                    _first: { marginLeft: 'auto' },
                    _last: { marginRight: 'auto' },
                },
                indicator: {
                    bg: `${colorScheme}.600`,
                    h: '2px',
                    mt: '-1.5px',
                },
                tabpanel: { p: 0, pt: 6 },
            }),
        }),
        Button: {
            variants: {
                outline: {
                    borderColor: 'blackAlpha.600',
                },
                inverted: {
                    bg: 'black',
                    color: 'white',
                    _hover: {
                        bg: 'transparent',
                        color: 'black',
                    },
                },
            },
        },
    },
    space: {
        '4.5': '1.125rem',
    },
    sizes: {
        '4.5': '1.125rem',
    },
    colors: {
        lime: {
            50: '#FFFFD3',
            100: '#EAFFC7',
            150: '#D7FF94',
            300: '#C4FF61',
            400: '#B1FF2E',
            '300-rgb': '196, 255, 97',
            600: '#2DB100',
            800: '#134B00',
        },
    },
    fonts: {
        body: 'Inter Variable, sans-serif',
        heading: 'Inter Variable, sans-serif',
    },
    semanticTokens: {
        colors: {
            ['chakra-border-color']: 'blackAlpha.200',
            ['scrollbar-thumb']: 'blackAlpha.300',
            ['scrollbar-track']: 'blackAlpha.50',
        },
        shadows: {
            'card-hover':
                '0 2px 4px -1px rgba(32, 126, 0, 0.06), 0 4px 6px -1px rgba(32, 126, 0, 0.1)',
        },
    },
} satisfies ThemeOverride;

export const theme = extendTheme(themeOverride);

declare global {
    type ChakraTheme = typeof themeOverride & DefaultTheme;
}
