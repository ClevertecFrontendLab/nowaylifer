import { extendTheme, Theme as DefaultTheme, ThemeOverride } from '@chakra-ui/react';

const themeOverride = {
    colors: {
        lime: {
            50: '#ffffd3',
            100: '#eaffc7',
            300: '#c4ff61',
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
