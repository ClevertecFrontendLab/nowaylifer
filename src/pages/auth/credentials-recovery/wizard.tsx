import { useCallbackRef } from '@chakra-ui/react';
import { memo, useState } from 'react';

import { AuthModalCloseButton, AuthModalContent } from '../common/auth-modal';
import { RecoverPassword } from './recover-password';
import { ResetPassword } from './reset-password';
import { VerifyOtp } from './verify-otp';

const steps = [RecoverPassword, VerifyOtp, ResetPassword];

export const CredentialsRecoveryWizard = memo(({ onComplete }: { onComplete?: () => void }) => {
    const [stepIndex, setStepIndex] = useState(0);
    const [email, setEmail] = useState<string>('');

    const next = useCallbackRef((email?: string) => {
        if (stepIndex === steps.length - 1) {
            return onComplete?.();
        }
        if (email) setEmail(email);
        setStepIndex((prev) => prev + 1);
    });

    const StepComponent = steps[stepIndex];

    return (
        <AuthModalContent>
            <AuthModalCloseButton />
            <StepComponent next={next} email={email} />
        </AuthModalContent>
    );
});
