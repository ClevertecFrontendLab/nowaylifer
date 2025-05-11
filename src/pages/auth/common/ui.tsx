import {
    Button,
    ButtonProps,
    chakra,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    InputProps,
} from '@chakra-ui/react';

import { PasswordInput } from './password-input';

export const Label = chakra(FormLabel, { baseStyle: { fontWeight: 'normal' } });

export const HelperText = chakra(FormHelperText, {
    baseStyle: { fontSize: 'xs', color: 'blackAlpha.700', mt: 1 },
});

export const ErrorMessage = chakra(FormErrorMessage, {
    baseStyle: { fontSize: 'xs', color: 'red.500', mt: 1 },
});

export const TextField = (props: InputProps) => (
    <Input size='lg' bg='white' borderColor='lime.150' {...props} />
);

export const PasswordField = (props: InputProps) => (
    <PasswordInput size='lg' bg='white' borderColor='lime.150' {...props} />
);

export const FormButton = (props: ButtonProps) => (
    <Button size='lg' variant='inverted' w='full' {...props} />
);
