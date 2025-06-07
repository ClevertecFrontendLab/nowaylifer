import { defineStyleConfig } from '@chakra-ui/react';

export const Button = defineStyleConfig({
    baseStyle: {
        _disabled: {
            pointerEvents: 'none',
        },
    },
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
});

export const CloseButton = defineStyleConfig({
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
});
