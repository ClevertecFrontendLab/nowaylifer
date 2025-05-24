import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, InputProps } from '@chakra-ui/react';

export const Input = createMultiStyleConfigHelpers(inputAnatomy.keys).defineMultiStyleConfig({
    defaultProps: {
        ['focusBorderColor' as string]: 'lime.300',
    } satisfies InputProps,
    baseStyle: {
        group: {
            borderColor: 'blackAlpha.600',
        },
        field: {
            color: 'lime.800',
            _placeholder: { color: 'lime.800' },
        },
    },
});
