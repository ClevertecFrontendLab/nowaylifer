import { modalAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

export const Modal = createMultiStyleConfigHelpers(modalAnatomy.keys).defineMultiStyleConfig({
    baseStyle: {
        overlay: {
            bg: 'blackAlpha.300',
            backdropFilter: 'blur(1.5px)',
        },
    },
});
