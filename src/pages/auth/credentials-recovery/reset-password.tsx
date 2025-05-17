import { chakra, FormControl, SlideFade, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useAppLoader } from '~/shared/infra/app-loader';
import { TestId } from '~/shared/test-ids';

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
import { ResetPasswordSchema, resetPasswordSchema } from './schema';

export const ResetPassword = ({ email, next }: { email: string; next: () => void }) => {
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

    useAppLoader(isLoading);

    const handleFormValid = async (values: ResetPasswordSchema) => {
        const body = { ...values, email };
        const res = await resetPassword(body);
        if (!res.error) next();
    };

    return (
        <SlideFade in={true} offsetY={0} offsetX={64}>
            <AuthModalBody>
                <AuthModalTitle w='min-content' mx='auto' mb={6}>
                    Восстановление аккаунта
                </AuthModalTitle>
                <chakra.form onSubmit={handleSubmit(handleFormValid)}>
                    <VStack gap={6} mb={8} textAlign='start'>
                        <FormControl isInvalid={!!errors.login}>
                            <Label>Логин для входа на сайт</Label>
                            <TextField
                                placeholder='Логин'
                                {...register('login')}
                                data-test-id={TestId.LOGIN_INPUT}
                            />
                            <HelperText>{LOGIN_HELPER_TEXT}</HelperText>
                            <ErrorMessage>{errors.login?.message}</ErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.password}>
                            <Label>Пароль</Label>
                            <PasswordField
                                placeholder='Пароль'
                                {...register('password')}
                                data-test-id={TestId.PASSWORD_INPUT}
                            />
                            <HelperText>{PASSWORD_HELPER_TEXT}</HelperText>
                            <ErrorMessage>{errors.password?.message}</ErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.passwordConfirm}>
                            <Label>Повторите пароль</Label>
                            <PasswordField
                                placeholder='Пароль'
                                {...register('passwordConfirm')}
                                data-test-id={TestId.PASSWORD_CONFIRM_INPUT}
                            />
                            <ErrorMessage>{errors.passwordConfirm?.message}</ErrorMessage>
                        </FormControl>
                    </VStack>
                    <FormButton type='submit' data-test-id={TestId.SUBMIT_BUTTON}>
                        Зарегистрироваться
                    </FormButton>
                </chakra.form>
            </AuthModalBody>
        </SlideFade>
    );
};
