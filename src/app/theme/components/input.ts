import { inputAnatomy, numberInputAnatomy, selectAnatomy } from '@chakra-ui/anatomy';
import {
    createMultiStyleConfigHelpers,
    defineStyleConfig,
    InputProps,
    NumberInputProps,
    SelectProps,
    TextareaProps,
} from '@chakra-ui/react';

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

export const NumberInput = createMultiStyleConfigHelpers(
    numberInputAnatomy.keys,
).defineMultiStyleConfig({
    defaultProps: {
        ['focusBorderColor' as string]: 'lime.300',
    } satisfies NumberInputProps,
});

export const Textarea = defineStyleConfig({
    defaultProps: {
        ['focusBorderColor' as string]: 'lime.300',
    } satisfies TextareaProps,
});

export const Select = createMultiStyleConfigHelpers(selectAnatomy.keys).defineMultiStyleConfig({
    defaultProps: {
        ['focusBorderColor' as string]: 'lime.300',
    } satisfies SelectProps,
});
