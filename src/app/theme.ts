import { extendTheme, Theme as DefaultTheme, ThemeOverride } from '@chakra-ui/react';

const themeOverride = {
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
    },
} satisfies ThemeOverride;

export const theme = extendTheme(themeOverride);

declare global {
    type ChakraTheme = typeof themeOverride & DefaultTheme;
}
