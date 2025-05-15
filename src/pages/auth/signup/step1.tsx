import { FormControl, VStack } from '@chakra-ui/react';
import { memo } from 'react';
import { useFormContext } from 'react-hook-form';

import { TestId } from '~/shared/test-ids';

import { ErrorMessage, FormButton, Label, TextField } from '../common/ui';
import { SignUpSchema } from './schema';

export const Step1 = memo(({ next }: { next: () => void }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext<SignUpSchema>();

    return (
        <VStack gap={6}>
            <FormControl isInvalid={!!errors.firstName}>
                <Label>Ваше имя</Label>
                <TextField
                    autoComplete='given-name'
                    placeholder='Имя'
                    {...register('firstName')}
                    data-test-id={TestId.FIRST_NAME_INPUT}
                />
                <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.lastName}>
                <Label>Ваша фамилия</Label>
                <TextField
                    autoComplete='family-name'
                    placeholder='Фамилия'
                    {...register('lastName')}
                    data-test-id={TestId.LAST_NAME_INPUT}
                />
                <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email} mb={6}>
                <Label>Ваш e-mail</Label>
                <TextField
                    placeholder='e-mail'
                    {...register('email')}
                    data-test-id={TestId.EMAIL_INPUT}
                />
                <ErrorMessage>{errors.email?.message}</ErrorMessage>
            </FormControl>
            <FormButton onClick={next} data-test-id={TestId.SUBMIT_BUTTON}>
                Дальше
            </FormButton>
        </VStack>
    );
});
