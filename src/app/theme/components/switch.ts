import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

export const Switch = createMultiStyleConfigHelpers(switchAnatomy.keys).defineMultiStyleConfig({
    baseStyle: {
        track: {
            '--switch-bg': 'colors.blackAlpha.300',
            _checked: {
                '--switch-bg': 'colors.lime.400',
            },
        },
    },
});
