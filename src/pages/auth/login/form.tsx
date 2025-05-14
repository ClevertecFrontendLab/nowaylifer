import { Button, Center, chakra, FormControl, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { isServerError } from '~/shared/api/util';
import { useShowAppLoader } from '~/shared/infra/app-loader';
import { useModal } from '~/shared/infra/modals-manager';
import { RoutePath } from '~/shared/router';
import { TestId } from '~/shared/test-ids';

import { authApi } from '../api';
import { ErrorMessage, FormButton, Label, PasswordField, TextField } from '../common/ui';
import { useCredentialsRecoveryWizard } from '../credentials-recovery';
import { RetryLoginModalContent } from './retry-login-modal';
import { LoginSchema, loginSchema } from './schema';

export const LoginForm = () => {
    const navigate = useNavigate();
    const { openWizard } = useCredentialsRecoveryWizard();
    const { openModal, closeModal } = useModal();
    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        resolver: zodResolver(loginSchema),
        defaultValues: { login: '', password: '' },
    });

    const [login, { isLoading }] = authApi.useLoginMutation();

    useShowAppLoader(isLoading);

    const handleFormValid = async (values: LoginSchema) => {
        const res = await login(values);
        if (!res.error) {
            return navigate(RoutePath.Main);
        }

        if (isServerError(res.error)) {
            openModal({
                content: (
                    <RetryLoginModalContent
                        onRetry={async () => {
                            const res = await login(values);
                            if (!res.error) {
                                closeModal();
                                navigate(RoutePath.Main);
                            }
                        }}
                    />
                ),
            });
        }
    };

    return (
        <chakra.form data-test-id={TestId.SIGN_IN_FORM} onSubmit={handleSubmit(handleFormValid)}>
            <VStack gap={6} mb='112px'>
                <FormControl isInvalid={!!errors.login}>
                    <Label>Логин для входа на сайт</Label>
                    <TextField
                        placeholder='Введите логин'
                        {...register('login')}
                        data-test-id={TestId.LOGIN_INPUT}
                    />
                    <ErrorMessage>{errors.login?.message}</ErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password}>
                    <Label>Пароль</Label>
                    <PasswordField
                        placeholder='Пароль для сайта'
                        {...register('password')}
                        data-test-id={TestId.PASSWORD_INPUT}
                        visibilityButtonProps={{
                            'data-test-id': TestId.PASSWORD_VISIBILITY_BUTTON,
                        }}
                    />
                    <ErrorMessage>{errors.password?.message}</ErrorMessage>
                </FormControl>
            </VStack>
            <FormButton type='submit' mb={4} data-test-id={TestId.SUBMIT_BUTTON}>
                Войти
            </FormButton>
            <Center>
                <Button
                    color='black'
                    variant='link'
                    onClick={openWizard}
                    data-test-id={TestId.FORGOT_PASSWORD_LINK}
                >
                    Забыли логин или пароль?
                </Button>
            </Center>
        </chakra.form>
    );
};
