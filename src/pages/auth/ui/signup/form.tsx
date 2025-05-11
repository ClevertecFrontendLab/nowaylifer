import { Box, chakra, Text, useCallbackRef } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useShowAppLoader } from '~/shared/infra/app-loader';
import { useModal } from '~/shared/infra/modals-provider';

import { authApi } from '../../api';
import { signUpSchema, signUpSchemaKeys } from '../../schema';
import { VerifyEmailModalContent } from '../modals/verify-email';
import { FormProgress } from './progress';
import { Step1 } from './step1';
import { Step2 } from './step2';

const steps = [
    {
        Component: Step1,
        fields: signUpSchemaKeys.slice(0, 3),
        title: 'Личная информация',
    },
    {
        Component: Step2,
        fields: signUpSchemaKeys.slice(3),
        title: 'Логин и пароль',
    },
];

export const SignupForm = () => {
    const [stepIndex, setStep] = useState(0);
    const formRef = useRef<HTMLFormElement>(null);
    const { openModal } = useModal();
    const form = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            login: '',
            password: '',
            confirmPassword: '',
        },
    });

    const [signup, { isLoading }] = authApi.useSignupMutation();

    useShowAppLoader(isLoading);

    const next = useCallbackRef(async () => {
        if (stepIndex === steps.length - 1) {
            return formRef.current?.requestSubmit();
        }
        const fields = steps[stepIndex].fields;
        const isValid = await form.trigger(fields);
        form.control._subjects.state.next({
            isSubmitted: true,
            submitCount: form.formState.submitCount + 1,
        });
        if (isValid) {
            setStep((prev) => prev + 1);
        }
    });

    const StepComponent = steps[stepIndex].Component;

    return (
        <Box>
            <FormProvider {...form}>
                <Text>
                    Шаг {stepIndex + 1}. {steps[stepIndex].title}
                </Text>
                <FormProgress />
                <chakra.form
                    ref={formRef}
                    onKeyDown={(e) => {
                        if (e.target instanceof HTMLInputElement && e.key === 'Enter') {
                            next();
                        }
                    }}
                    onSubmit={form.handleSubmit(async (values) => {
                        const res = await signup(values);
                        if (!res.error) {
                            openModal({
                                content: <VerifyEmailModalContent email={values.email} />,
                            });
                        }
                    })}
                >
                    <StepComponent next={next} />
                </chakra.form>
            </FormProvider>
        </Box>
    );
};
