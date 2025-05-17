import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

import { recipeCardAnatomy } from './anatomy';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(recipeCardAnatomy.keys);

export type RecipeCardVariant = keyof NonNullable<typeof recipeCardTheme.variants>;

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
            display: 'flex',
            gap: 2,
            fontSize: 'xs',
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
        image: {
            boxSize: 'full',
            objectFit: 'cover',
        },
    },
    variants: {
        vertical: {
            root: {
                flexDir: 'column',
                h: { base: '220px', lg: '402px', '2xl': '414px' },
                w: { base: '158px', lg: '277px', '2xl': '322px' },
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
            title: {
                display: { base: '-webkit-box', lg: 'block' },
                noOfLines: { base: 2, lg: 1 },
                isTruncated: { lg: true },
            },
            description: {
                hideBelow: 'lg',
            },
            categoryList: {
                direction: { base: 'column', lg: 'row' },
                pos: { base: 'absolute', lg: 'static' },
                top: 2,
                left: 2,
            },
        },
        horizontal: {
            root: {
                flexDir: 'row',
                minH: { base: '128px', lg: '244px' },
                maxH: '300px',
            },
            imageContainer: {
                h: 'full',
                w: {
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
                mb: { base: 0, lg: 6 },
            },
            category: {
                bg: 'lime.50',
            },
            categoryList: {
                direction: { base: 'column', lg: 'row' },
                pos: { base: 'absolute', lg: 'static' },
                top: 2,
                left: 2,
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
            categoryList: {
                alignSelf: 'end',
            },
            title: {
                isTruncated: true,
            },
            stats: {
                display: 'grid',
                flex: 1,
                w: 'full',
                gridTemplateColumns: 'repeat(auto-fit, minmax(35px, auto))',
                justifyItems: 'start',
                justifyContent: 'end',
                rowGap: 0,
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
