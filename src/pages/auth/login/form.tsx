import { Button, Center, chakra, FormControl, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { isServerError } from '~/shared/api/util';
import { useShowAppLoader } from '~/shared/infra/app-loader';
import { useModal } from '~/shared/infra/modals-provider';
import { RoutePath } from '~/shared/router';

import { authApi } from '../api';
import { ErrorMessage, FormButton, Label, PasswordField, TextField } from '../common/ui';
import { useCredentialsRecoveryWizard } from '../credentials-recovery';
import { RetryLoginModalContent } from './retry-login-modal';
import { loginSchema } from './schema';

export const LoginForm = () => {
    const navigate = useNavigate();
    const { openWizard } = useCredentialsRecoveryWizard();
    const { openModal } = useModal();
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

    return (
        <chakra.form
            onSubmit={handleSubmit(async (values) => {
                const res = await login(values);
                const err = res.error;
                if (!err) return navigate(RoutePath.Main);
                if (isServerError(err)) {
                    openModal({
                        content: <RetryLoginModalContent onRetry={() => login(values)} />,
                    });
                }
            })}
        >
            <VStack gap={6} mb='112px'>
                <FormControl isInvalid={!!errors.login}>
                    <Label>Логин для входа на сайт</Label>
                    <TextField placeholder='Введите логин' {...register('login')} />
                    <ErrorMessage>{errors.login?.message}</ErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password}>
                    <Label>Пароль</Label>
                    <PasswordField placeholder='Пароль для сайта' {...register('password')} />
                    <ErrorMessage>{errors.password?.message}</ErrorMessage>
                </FormControl>
            </VStack>
            <FormButton type='submit' mb={4}>
                Войти
            </FormButton>
            <Center>
                <Button color='black' variant='link' onClick={openWizard}>
                    Забыли логин или пароль?
                </Button>
            </Center>
        </chakra.form>
    );
};
