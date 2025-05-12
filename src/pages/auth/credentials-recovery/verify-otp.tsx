import { HStack, PinInput, PinInputField, SlideFade } from '@chakra-ui/react';
import { useState } from 'react';

import { isClientError } from '~/shared/api/util';
import { useShowAppLoader } from '~/shared/infra/app-loader';
import { TestId } from '~/shared/test-ids';

import { authApi } from '../api';
import {
    AuthModalBody,
    AuthModalDescription,
    AuthModalImage,
    AuthModalSmallPrint,
    AuthModalTitle,
} from '../common/auth-modal';

const OTP_LENGTH = 6;

export const VerifyOtp = ({ next, email }: { next: () => void; email: string }) => {
    const [verifyOtp, { isLoading }] = authApi.useVerifyOtpMutation();
    const [isInvalid, setIsInvalid] = useState(false);
    const [otp, setOtp] = useState('');

    useShowAppLoader(isLoading);

    return (
        <SlideFade in={true} offsetY={0} offsetX={64}>
            <AuthModalBody>
                <AuthModalImage src='/images/laptop-breakfast.png' />
                {isInvalid && <AuthModalTitle>Неверный код</AuthModalTitle>}
                <AuthModalDescription mb={4}>
                    Мы отправили вам на e-mail <b>{email}</b> шестизначный код. Введите его ниже.
                </AuthModalDescription>
                <HStack mb={6} justify='center'>
                    <PinInput
                        otp
                        focusBorderColor='lime.300'
                        value={otp}
                        isInvalid={isInvalid}
                        onChange={setOtp}
                        onComplete={async (otpToken) => {
                            setIsInvalid(false);
                            const res = await verifyOtp({ email, otpToken });
                            if (!res.error) return next();
                            setIsInvalid(isClientError(res.error));
                            setOtp('');
                        }}
                    >
                        {Array.from({ length: OTP_LENGTH }, (_, idx) => (
                            <PinInputField data-test-id={TestId.otpInput(idx)} />
                        ))}
                    </PinInput>
                </HStack>
                <AuthModalSmallPrint>Не пришло письмо? Проверьте папку Спам.</AuthModalSmallPrint>
            </AuthModalBody>
        </SlideFade>
    );
};
