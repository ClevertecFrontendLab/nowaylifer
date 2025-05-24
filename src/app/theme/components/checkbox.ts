import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

export const Checkbox = createMultiStyleConfigHelpers(checkboxAnatomy.keys).defineMultiStyleConfig({
    baseStyle: {
        control: {
            color: 'black',
            borderColor: 'lime.150',
            _checked: {
                color: 'black',
                bg: 'lime.400',
                borderColor: 'lime.400',
            },
        },
    },
});
