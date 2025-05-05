import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(['container', 'spinner']);

export const loaderTheme = defineMultiStyleConfig({
    baseStyle: {
        container: {
            bgGradient:
                'radial(50% 50% at center, rgba(var(--chakra-colors-lime-300-rgb), 0.7), transparent)',
        },
        spinner: {
            color: 'black',
        },
    },
    sizes: {
        sm: {
            container: { boxSize: '134px' },
            spinner: { boxSize: '24px' },
        },
        md: {
            container: { boxSize: '206px' },
            spinner: { boxSize: '38px' },
        },
    },
    defaultProps: {
        size: 'sm',
    },
});
