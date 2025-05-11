import { FormControl, VStack } from '@chakra-ui/react';
import { memo } from 'react';
import { useFormContext } from 'react-hook-form';

import { SignUpSchema } from '../../schema';
import { ErrorMessage, FormButton, HelperText, Label, PasswordField, TextField } from '../common';

export const Step2 = memo(() => {
    const {
        register,
        formState: { errors },
    } = useFormContext<SignUpSchema>();

    return (
        <VStack gap={6}>
            <FormControl isInvalid={!!errors.login}>
                <Label>Логин для входа на сайт</Label>
                <TextField
                    autoComplete='username'
                    placeholder='Введите логин'
                    {...register('login')}
                />
                <HelperText>Логин не менее 5 символов, только латиница</HelperText>
                <ErrorMessage>{errors.login?.message}</ErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
                <Label>Пароль</Label>
                <PasswordField
                    autoComplete='new-password'
                    placeholder='Пароль для сайта'
                    {...register('password')}
                />
                <HelperText>Пароль не менее 8 символов, с заглавной буквой и цифрой</HelperText>
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.confirmPassword} mb={6}>
                <Label>Повторите пароль</Label>
                <PasswordField
                    autoComplete='off'
                    placeholder='Пароль для сайта'
                    {...register('confirmPassword')}
                />
                <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
            </FormControl>
            <FormButton type='submit'>Зарегистрироваться</FormButton>
        </VStack>
    );
});
