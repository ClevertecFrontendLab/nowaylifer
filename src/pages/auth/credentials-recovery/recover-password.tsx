import { chakra, FormControl } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { isQueryHttpError } from '~/shared/api/util';
import imageUrl from '~/shared/assets/breakfast.png';
import { useAppLoader } from '~/shared/infra/app-loader';
import {
    AppModalBody,
    AppModalDescription,
    AppModalImage,
    AppModalSmallPrint,
} from '~/shared/infra/modals-manager';
import { TestId } from '~/shared/test-ids';

import { authApi } from '../api';
import { ErrorMessage, FormButton, Label, TextField } from '../common/ui';
import { RecoverPasswordSchema, recoverPasswordSchema } from './schema';

export const RecoverPassword = ({ next }: { next: (email: string) => void }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        resolver: zodResolver(recoverPasswordSchema),
        defaultValues: { email: '' },
    });

    const [recoverPassword, { isLoading }] = authApi.useRecoverPasswordMutation();

    useAppLoader(isLoading);

    const handleFormValid = async (values: RecoverPasswordSchema) => {
        const res = await recoverPassword(values);
        if (!res.error) return next(values.email);
        if (isQueryHttpError(res.error)) {
            setValue('email', '');
            setError('email', { message: '' });
        }
    };

    return (
        <AppModalBody>
            <AppModalImage src={imageUrl} />
            <AppModalDescription mb={4}>
                Для восстановления входа введите ваш e-mail, куда можно отправить уникальный код
            </AppModalDescription>
            <chakra.form mb={6} onSubmit={handleSubmit(handleFormValid)}>
                <FormControl isInvalid={!!errors.email} mb={6}>
                    <Label>Ваш e-mail</Label>
                    <TextField
                        placeholder='e-mail'
                        {...register('email')}
                        data-test-id={TestId.EMAIL_INPUT}
                    />
                    <ErrorMessage m={0}>{errors.email?.message}</ErrorMessage>
                </FormControl>
                <FormButton type='submit' data-test-id={TestId.SUBMIT_BUTTON}>
                    Получить код
                </FormButton>
            </chakra.form>
            <AppModalSmallPrint>Не пришло письмо? Проверьте папку Спам.</AppModalSmallPrint>
        </AppModalBody>
    );
};
