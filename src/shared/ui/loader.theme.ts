import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(['container', 'spinner']);

export const loaderTheme = defineMultiStyleConfig({
    baseStyle: {
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
