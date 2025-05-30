import { extendTheme, Theme as DefaultTheme, ThemeOverride } from '@chakra-ui/react';

import { recipeCardTheme } from '~/entities/recipe';
import { loaderTheme } from '~/shared/ui/loader.theme';
import { multiSelectTheme } from '~/shared/ui/multi-select/lib';

import { Alert } from './components/alert';
import { Badge } from './components/badge';
import { Button, CloseButton } from './components/button';
import { Card } from './components/card';
import { Checkbox } from './components/checkbox';
import { Input, NumberInput, Select, Textarea } from './components/input';
import { FormLabel } from './components/label';
import { Link } from './components/link';
import { Modal } from './components/modal';
import { Progress } from './components/progress';
import { Switch } from './components/switch';
import { Tabs } from './components/tabs';

const themeOverride = {
    styles: {
        global: {
            body: {
                overflowY: 'scroll',
            },
            '#chakra-toast-manager-bottom': {
                width: '100vw',
            },
        },
    },
    components: {
        Modal,
        Alert,
        Progress,
        Loader: loaderTheme,
        MultiSelect: multiSelectTheme,
        RecipeCard: recipeCardTheme,
        Link,
        Tabs,
        Button,
        CloseButton,
        Badge,
        Card,
        Input,
        FormLabel,
        Select,
        NumberInput,
        Textarea,
        Checkbox,
        Switch,
    },
    zIndices: {
        appLoader: 1650,
    },
    breakpoints: {
        '1.5xl': '90em',
        '2sm': '40em',
        '2md': '54em',
    },
    space: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
        '7.5': '1.875rem',
        '9.5': '2.375rem',
        25: '6.25rem',
    },
    sizes: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.5': '1.625rem',
        '7.5': '1.875rem',
        '9.5': '2.375rem',
        25: '6.25rem',
    },
    colors: {
        lime: {
            50: '#FFFFD3',
            100: '#EAFFC7',
            150: '#D7FF94',
            300: '#C4FF61',
            '300-rgb': '196, 255, 97',
            400: '#B1FF2E',
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
