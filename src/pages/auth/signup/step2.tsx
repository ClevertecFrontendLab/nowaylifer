import { FormControl, SlideFade, VStack } from '@chakra-ui/react';
import { memo } from 'react';
import { useFormContext } from 'react-hook-form';

import { TestId } from '~/shared/test-ids';

import {
    ErrorMessage,
    FormButton,
    HelperText,
    Label,
    PasswordField,
    TextField,
} from '../common/ui';
import { SignUpSchema } from './schema';

export const Step2 = memo(() => {
    const {
        register,
        formState: { errors },
    } = useFormContext<SignUpSchema>();

    return (
        <SlideFade offsetY={0} offsetX={64} in={true}>
            <VStack gap={6}>
                <FormControl isInvalid={!!errors.login}>
                    <Label>Логин для входа на сайт</Label>
                    <TextField
                        autoComplete='username'
                        placeholder='Введите логин'
                        {...register('login')}
                        data-test-id={TestId.LOGIN_INPUT}
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
                        data-test-id={TestId.PASSWORD_INPUT}
                    />
                    <HelperText>Пароль не менее 8 символов, с заглавной буквой и цифрой</HelperText>
                    <ErrorMessage>{errors.password?.message}</ErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.passwordConfirm} mb={6}>
                    <Label>Повторите пароль</Label>
                    <PasswordField
                        autoComplete='off'
                        placeholder='Пароль для сайта'
                        {...register('passwordConfirm')}
                        data-test-id={TestId.PASSWORD_CONFIRM_INPUT}
                    />
                    <ErrorMessage>{errors.passwordConfirm?.message}</ErrorMessage>
                </FormControl>
                <FormButton type='submit' data-test-id={TestId.SUBMIT_BUTTON}>
                    Зарегистрироваться
                </FormButton>
            </VStack>
        </SlideFade>
    );
});
