import { Box, chakra, Text, useCallbackRef } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useAppLoader } from '~/shared/infra/app-loader';
import { useModal } from '~/shared/infra/modals-manager';
import { RoutePath } from '~/shared/router';
import { TestId } from '~/shared/test-ids';

import { authApi } from '../api';
import { FormProgress } from './progress';
import { SignUpSchema, signUpSchema, signUpSchemaKeys } from './schema';
import { SignUpSuccessModalContent } from './sign-up-success-modal';
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
    const navigate = useNavigate();
    const form = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        resolver: zodResolver(signUpSchema),
        shouldFocusError: false,
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            login: '',
            password: '',
            passwordConfirm: '',
        },
    });

    const [signup, { isLoading }] = authApi.useSignupMutation();

    useAppLoader(isLoading);

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

    const handleFormKeyDown = (e: React.KeyboardEvent) => {
        if (e.target instanceof HTMLInputElement && e.key === 'Enter') {
            next();
        }
    };

    const handleFormValid = async (values: SignUpSchema) => {
        const res = await signup(values);
        if (!res.error) {
            navigate(RoutePath.Login);
            openModal({
                content: <SignUpSuccessModalContent email={values.email} />,
            });
        }
    };

    return (
        <Box>
            <FormProvider {...form}>
                <Text>
                    Шаг {stepIndex + 1}. {steps[stepIndex].title}
                </Text>
                <FormProgress data-test-id={TestId.SIGN_UP_PROGRESS} />
                <chakra.form
                    data-test-id={TestId.SIGN_UP_FORM}
                    ref={formRef}
                    onKeyDown={handleFormKeyDown}
                    onSubmit={form.handleSubmit(handleFormValid)}
                >
                    <StepComponent next={next} />
                </chakra.form>
            </FormProvider>
        </Box>
    );
};
