import {
    cardAnatomy,
    checkboxAnatomy,
    inputAnatomy,
    switchAnatomy,
    tabsAnatomy,
} from '@chakra-ui/anatomy';
import {
    createMultiStyleConfigHelpers,
    extendTheme,
    InputProps,
    Theme as DefaultTheme,
    ThemeOverride,
} from '@chakra-ui/react';

import { recipeCardTheme } from '~/entities/recipe';

const themeOverride = {
    components: {
        RecipeCard: recipeCardTheme,
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
        CloseButton: {
            variants: {
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
        Badge: {
            baseStyle: {
                color: 'black',
                textTransform: 'none',
                fontWeight: 'normal',
                fontSize: 'sm',
            },
        },
        Card: createMultiStyleConfigHelpers(cardAnatomy.keys).defineMultiStyleConfig({
            baseStyle: {
                container: {
                    boxShadow: 'none',
                    borderColor: 'chakra-border-color',
                    borderWidth: '1px',
                    borderRadius: 'lg',
                    overflow: 'hidden',
                },
            },
        }),
        Input: createMultiStyleConfigHelpers(inputAnatomy.keys).defineMultiStyleConfig({
            defaultProps: {
                ['focusBorderColor' as string]: 'lime.300',
            } satisfies InputProps,
            baseStyle: {
                group: {
                    borderColor: 'blackAlpha.600',
                },
                field: {
                    color: 'lime.800',
                    _placeholder: { color: 'lime.800' },
                },
            },
        }),
        Checkbox: createMultiStyleConfigHelpers(checkboxAnatomy.keys).defineMultiStyleConfig({
            baseStyle: {
                control: {
                    color: 'black',
                    borderColor: 'lime.150',
                    _checked: {
                        color: 'black',
                        bg: 'lime.400',
                        borderColor: 'lime.400',
                    },
                },
            },
        }),
        Switch: createMultiStyleConfigHelpers(switchAnatomy.keys).defineMultiStyleConfig({
            baseStyle: {
                track: {
                    '--switch-bg': 'colors.blackAlpha.300',
                    _checked: {
                        '--switch-bg': 'colors.lime.400',
                    },
                },
            },
        }),
    },
    breakpoints: {
        '1.5xl': '90em',
    },
    space: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
    },
    sizes: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
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
            700: '#207E00',
            800: '#134B00',
        },
    },
    lineHeights: {
        short: 1.33,
    },
    fonts: {
        body: 'Inter Variable, sans-serif',
        heading: 'Inter Variable, sans-serif',
    },
    semanticTokens: {
        colors: {
            ['chakra-border-color']: 'blackAlpha.200',
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
