import { createMultiStyleConfigHelpers, HTMLChakraProps } from '@chakra-ui/react';

export type DishCardParts = (typeof dishCardTheme.parts)[number];

export type DishCardStyles<T extends React.ElementType = 'div'> = Record<
    DishCardParts,
    HTMLChakraProps<T>
>;

export type DishCardVariant = keyof NonNullable<typeof dishCardTheme.variants>;

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers([
    'root',
    'body',
    'imageContainer',
    'title',
    'description',
    'stats',
    'category',
    'badge',
]);

export const dishCardTheme = defineMultiStyleConfig({
    defaultProps: {
        variant: 'horizontal',
    },
    baseStyle: {
        root: {
            pos: 'relative',
            display: 'flex',
            overflow: 'hidden',
            boxShadow: 'none',
            borderWidth: '1px',
            borderRadius: 'lg',
            borderColor: 'blackAlpha.200',
            transitionProperty: 'box-shadow',
            transitionDuration: 'normal',
            _hover: {
                boxShadow: 'card-hover',
            },
        },
        body: {
            display: 'flex',
            flexDir: 'column',
        },
        stats: {
            gap: 2,
        },
        badge: {
            h: 6,
            px: { base: 1, lg: 2 },
            gap: { base: '2px', lg: 2 },
            color: 'black',
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
        title: {
            fontWeight: 'medium',
            fontSize: { base: 'md', lg: 'lg', '2xl': 'xl' },
            noOfLines: 1,
            mb: 2,
        },
        description: {
            hideBelow: 'lg',
            fontSize: 'sm',
            noOfLines: 3,
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
                mt: { base: 0, lg: 6 },
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
                mb: 0,
            },
        },
        'no-image': {
            root: {
                h: { base: '168px', lg: '180px', '2xl': '192px' },
            },
            body: {
                p: { base: 3, lg: 4, '2xl': 6 },
            },
            category: {
                bg: 'lime.50',
            },
            description: {
                hideBelow: {},
            },
        },
    },
});
