import {
    alertAnatomy,
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
import { loaderTheme } from '~/shared/ui/loader.theme';
import { multiSelectTheme } from '~/shared/ui/multi-select';

const themeOverride = {
    styles: {
        global: {
            '#chakra-toast-manager-bottom': {
                width: '100vw',
                pb: 8,
            },
        },
    },
    components: {
        Alert: createMultiStyleConfigHelpers(alertAnatomy.keys).defineMultiStyleConfig({
            variants: {
                solid: ({ colorScheme: c }) => ({
                    container: {
                        ['--alert-bg']: `colors.${c}.500`,
                    },
                }),
            },
        }),
        Loader: loaderTheme,
        MultiSelect: multiSelectTheme,
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
            baseStyle: ({ colorScheme: c }) => ({
                tab: {
                    '--tabs-color': `colors.${c}.800`,
                    fontWeight: 'medium',
                    whiteSpace: 'nowrap',
                    borderBottomColor: 'transparent !important',
                    // _first: { marginLeft: 'auto' },
                    // _last: { marginRight: 'auto' },
                },
                indicator: {
                    bg: `${c}.600`,
                },
                tabpanel: { p: 0, pt: 6 },
            }),
        }),
        Button: {
            baseStyle: {
                _disabled: {
                    pointerEvents: 'none',
                },
            },
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
        '7.5': '1.875rem',
    },
    sizes: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
        '7.5': '1.875rem',
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

export const theme = extendTheme(themeOverride) as ChakraTheme;

declare global {
    type ChakraTheme = typeof themeOverride & DefaultTheme;
}
