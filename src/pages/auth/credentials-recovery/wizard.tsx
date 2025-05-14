import { useCallbackRef } from '@chakra-ui/react';
import { memo, useState } from 'react';

import { TestId } from '~/shared/test-ids';

import { AuthModalCloseButton, AuthModalContent } from '../common/auth-modal';
import { RecoverPassword } from './recover-password';
import { ResetPassword } from './reset-password';
import { VerifyOtp } from './verify-otp';

const steps = [
    { Component: RecoverPassword, testId: TestId.RECOVER_PASSWORD_MODAL },
    { Component: VerifyOtp, testId: TestId.VERIFY_OTP_MODAL },
    { Component: ResetPassword, testId: TestId.RESET_PASSWORD_MODAL },
];

export const CredentialsRecoveryWizard = memo(({ onComplete }: { onComplete?: () => void }) => {
    const [stepIndex, setStepIndex] = useState(0);
    const [email, setEmail] = useState<string>('ekaterinabaker@gmail.ru');

    const next = useCallbackRef((email?: string) => {
        if (stepIndex === steps.length - 1) {
            return onComplete?.();
        }
        if (email) setEmail(email);
        setStepIndex((prev) => prev + 1);
    });

    const StepComponent = steps[stepIndex].Component;

    return (
        <AuthModalContent data-test-id={steps[stepIndex].testId}>
            <AuthModalCloseButton data-test-id={TestId.MODAL_CLOSE_BUTTON} />
            <StepComponent next={next} email={email} />
        </AuthModalContent>
    );
});
