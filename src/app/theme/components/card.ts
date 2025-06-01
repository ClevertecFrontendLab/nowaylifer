import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

export const Card = createMultiStyleConfigHelpers(cardAnatomy.keys).defineMultiStyleConfig({
    baseStyle: {
        container: {
            boxShadow: 'none',
            borderColor: 'chakra-border-color',
            borderWidth: '1px',
            borderRadius: 'lg',
            overflow: 'hidden',
        },
    },
});
