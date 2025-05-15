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

import { PasswordInput, PasswordInputProps } from '~/shared/ui/password-input';

export const Label = chakra(FormLabel, { baseStyle: { fontWeight: 'normal', mb: 1 } });

export const HelperText = chakra(FormHelperText, {
    baseStyle: { fontSize: 'xs', color: 'blackAlpha.700', mt: 1, lineHeight: 4 },
});

export const ErrorMessage = chakra(FormErrorMessage, {
    baseStyle: { fontSize: 'xs', color: 'red.500', mt: 1, lineHeight: 4 },
});

export const TextField = ({ onBlur, ...props }: InputProps) => (
    <Input
        size='lg'
        bg='white'
        borderColor='lime.150'
        onBlur={(e) => {
            e.currentTarget.value = e.currentTarget.value.trim();
            onBlur?.(e);
        }}
        {...props}
    />
);

export const PasswordField = (props: PasswordInputProps) => (
    <PasswordInput size='lg' bg='white' borderColor='lime.150' {...props} />
);

export const FormButton = (props: ButtonProps) => (
    <Button size='lg' variant='inverted' w='full' {...props} />
);
