import { FormControl, VStack } from '@chakra-ui/react';
import { memo } from 'react';
import { useFormContext } from 'react-hook-form';

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
                <TextField autoComplete='given-name' placeholder='Имя' {...register('firstName')} />
                <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.lastName}>
                <Label>Ваша фамилия</Label>
                <TextField
                    autoComplete='family-name'
                    placeholder='Фамилия'
                    {...register('lastName')}
                />
                <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email} mb={6}>
                <Label>Ваш e-mail</Label>
                <TextField placeholder='e-mail' {...register('email')} />
                <ErrorMessage>{errors.email?.message}</ErrorMessage>
            </FormControl>
            <FormButton onClick={next}>Дальше</FormButton>
        </VStack>
    );
});
