import { chakra, FormControl, SlideFade, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useShowAppLoader } from '~/shared/infra/app-loader';

import { authApi } from '../api';
import { AuthModalBody, AuthModalTitle } from '../common/auth-modal';
import { LOGIN_HELPER_TEXT, PASSWORD_HELPER_TEXT } from '../common/text';
import {
    ErrorMessage,
    FormButton,
    HelperText,
    Label,
    PasswordField,
    TextField,
} from '../common/ui';
import { resetPasswordSchema } from './schema';

export const ResetPassword = ({ next }: { next: () => void }) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { login: '', password: '', passwordConfirm: '' },
    });

    const [resetPassword, { isLoading }] = authApi.useResetPasswordMutation();
    useShowAppLoader(isLoading);

    return (
        <SlideFade in={true} offsetY={0} offsetX={64}>
            <AuthModalBody>
                <AuthModalTitle w='min-content' mx='auto' mb={6}>
                    Восстановление аккаунта
                </AuthModalTitle>
                <chakra.form
                    onSubmit={handleSubmit(async (values) => {
                        const res = await resetPassword(values);
                        if (!res.error) next();
                    })}
                >
                    <VStack gap={6} mb={8} textAlign='start'>
                        <FormControl isInvalid={!!errors.login}>
                            <Label>Логин для входа на сайт</Label>
                            <TextField placeholder='Логин' {...register('login')} />
                            <HelperText>{LOGIN_HELPER_TEXT}</HelperText>
                            <ErrorMessage>{errors.login?.message}</ErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.password}>
                            <Label>Пароль</Label>
                            <PasswordField placeholder='Пароль' {...register('password')} />
                            <HelperText>{PASSWORD_HELPER_TEXT}</HelperText>
                            <ErrorMessage>{errors.password?.message}</ErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.passwordConfirm}>
                            <Label>Повторите пароль</Label>
                            <PasswordField placeholder='Пароль' {...register('passwordConfirm')} />
                            <ErrorMessage>{errors.passwordConfirm?.message}</ErrorMessage>
                        </FormControl>
                    </VStack>
                    <FormButton type='submit'>Зарегистрироваться</FormButton>
                </chakra.form>
            </AuthModalBody>
        </SlideFade>
    );
};
