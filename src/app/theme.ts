import { extendTheme, Theme as DefaultTheme, ThemeOverride } from '@chakra-ui/react';

import { dishCardTheme } from '~/shared/ui/DishCard/DishCard.theme';

const themeOverride = {
    components: {
        DishCard: dishCardTheme,
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
            '300-rgb': '196, 255, 97',
            600: '#2DB100',
            800: '#134B00',
        },
    },
    fonts: {
        body: 'Inter Variable, sans-serif',
    },
    semanticTokens: {
        colors: {
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
