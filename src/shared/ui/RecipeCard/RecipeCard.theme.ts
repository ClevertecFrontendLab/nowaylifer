import { createMultiStyleConfigHelpers, HTMLChakraProps } from '@chakra-ui/react';

export type RecipeCardParts = (typeof recipeCardTheme.parts)[number];

export type RecipeCardStyles<T extends React.ElementType = 'div'> = Record<
    RecipeCardParts,
    HTMLChakraProps<T>
>;

export type RecipeCardVariant = keyof NonNullable<typeof recipeCardTheme.variants>;

export const themeKey = 'RecipeCard';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers([
    'root',
    'body',
    'image',
    'imageContainer',
    'title',
    'description',
    'stats',
    'category',
    'badge',
]);

export const recipeCardTheme = defineMultiStyleConfig({
    defaultProps: {
        variant: 'horizontal',
    },
    baseStyle: {
        root: {
            pos: 'relative',
            transitionProperty: 'box-shadow',
            transitionDuration: 'normal',
            _hover: {
                boxShadow: 'card-hover',
            },
        },
        body: {
            display: 'flex',
            flexDir: 'column',
            minW: 0,
        },
        stats: {
            gap: 2,
        },
        badge: {
            h: 6,
            px: 2,
            gap: 2,
            variant: 'solid',
            fontSize: 'sm',
            bg: 'lime.150',
            fontWeight: 'normal',
            textTransform: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            lineHeight: 'shorter',
            borderRadius: 'base',
            flexShrink: 0,
        },
        category: {
            gap: { base: '2px', lg: 2 },
            px: { base: 1, lg: 2 },
        },
        title: {
            fontWeight: 'medium',
            fontSize: { base: 'md', lg: 'lg', '2xl': 'xl' },
            mb: 2,
        },
        description: {
            fontSize: 'sm',
            noOfLines: 3,
        },
        imageContainer: {
            minW: 0,
            flexShrink: 0,
        },
    },
    variants: {
        vertical: {
            root: {
                flexDir: 'column',
                h: { base: '220px', lg: '402px', '2xl': '414px' },
                maxW: { base: '158px', lg: '277px', '2xl': '322px' },
            },
            imageContainer: {
                h: { base: '128px', lg: '230px' },
            },
            body: {
                flexDir: 'column',
                px: { base: 2, lg: 3, '2xl': 6 },
                pt: { base: 2, lg: 3, '2xl': 4 },
                pb: { base: 1, lg: 3, '2xl': 5 },
            },
            category: {
                top: 2,
                left: 2,
                pos: { base: 'absolute', lg: 'static' },
            },
            title: {
                display: { base: '-webkit-box', lg: 'block' },
                noOfLines: { base: 2, lg: 1 },
                isTruncated: { lg: true },
            },
            description: {
                hideBelow: 'lg',
            },
        },
        horizontal: {
            root: {
                flexDir: 'row',
                h: { base: '128px', lg: '244px' },
            },
            imageContainer: {
                h: 'full',
                maxW: {
                    base: '158px',
                    lg: '346px',
                },
            },
            body: {
                flexDir: 'column',
                px: { base: 2, lg: 6 },
                py: { base: 2, lg: 5 },
            },
            title: {
                display: { base: '-webkit-box', lg: 'block' },
                noOfLines: { base: 2, lg: 1 },
                isTruncated: { lg: true },
                mt: { base: 0, lg: 6 },
            },
            description: {
                hideBelow: 'lg',
            },
            category: {
                bg: 'lime.50',
                top: 2,
                left: 2,
                pos: { base: 'absolute', lg: 'static' },
            },
        },
        compact: {
            body: {
                px: { base: 3, '2xl': 6 },
                py: { base: '10px', '2xl': 3 },
                gap: 2,
                flexDir: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            },
            title: {
                isTruncated: true,
                mb: 0,
            },
        },
        'no-image': {
            root: {
                minH: '168px',
            },
            body: {
                p: { base: 3, lg: 4, '2xl': 6 },
            },
            category: {
                bg: 'lime.50',
            },
            title: {
                isTruncated: true,
            },
        },
        detailed: {
            root: {
                flexDir: { base: 'column', md: 'row' },
                border: 'none',
                minH: { base: 'auto', md: '224px', lg: '410px' },
                h: { base: 'auto', lg: 0 },
                _hover: {
                    boxShadow: 'none',
                },
            },
            body: {
                pb: 0,
                px: 0,
                pt: { base: 4, md: 0 },
                pl: { base: 0, md: 4, lg: 6 },
                minW: 'auto',
            },
            title: {
                mt: 8,
                mb: { base: 4, lg: 6 },
                fontWeight: 700,
                fontSize: () => ({ base: '2xl', lg: '5xl' }),
            },
            description: {
                mb: 6,
                noOfLines: {},
            },
            stats: {
                fontSize: { base: 'xs', '2xl': 'sm' },
                alignSelf: 'start',
            },
            category: {
                bg: 'lime.50',
                gap: 2,
                px: 2,
            },
            imageContainer: {
                maxW: { base: 'full', md: '232px', lg: '353px', '2xl': '553px' },
                h: { base: '224px', md: 'auto' },
                flexShrink: 1,
            },
            image: {
                w: 'full',
                borderRadius: 'lg',
            },
        },
    },
});
