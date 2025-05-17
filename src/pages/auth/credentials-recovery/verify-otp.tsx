import { chakra, HStack, PinInput, PinInputField, SlideFade } from '@chakra-ui/react';
import { useState } from 'react';

import { isClientError } from '~/shared/api/util';
import { useAppLoader } from '~/shared/infra/app-loader';
import { TestId } from '~/shared/test-ids';

import { authApi } from '../api';
import imageUrl from '../assets/gaming-on-portable-console.png';
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

    useAppLoader(isLoading);

    const handleOtpComplete = async (otpToken: string) => {
        setIsInvalid(false);
        const res = await verifyOtp({ email, otpToken });
        if (!res.error) return next();
        setIsInvalid(isClientError(res.error));
        setOtp('');
    };

    return (
        <SlideFade in={true} offsetY={0} offsetX={64}>
            <AuthModalBody>
                <AuthModalImage src={imageUrl} />
                {isInvalid && <AuthModalTitle>Неверный код</AuthModalTitle>}
                <AuthModalDescription mb={4}>
                    Мы отправили вам на e-mail
                    <chakra.b display='block' fontWeight='semibold' isTruncated>
                        {email}
                    </chakra.b>
                    шестизначный код. Введите&nbsp;его&nbsp;ниже.
                </AuthModalDescription>
                <HStack mb={6} justify='center' gap={1.5}>
                    <PinInput
                        otp
                        focusBorderColor='lime.300'
                        value={otp}
                        isInvalid={isInvalid}
                        onChange={setOtp}
                        onComplete={handleOtpComplete}
                    >
                        {Array.from({ length: OTP_LENGTH }, (_, idx) => (
                            <PinInputField flexShrink={0} data-test-id={TestId.otpInput(idx)} />
                        ))}
                    </PinInput>
                </HStack>
                <AuthModalSmallPrint>
                    Не пришло письмо? Проверьте&nbsp;папку&nbsp;Спам.
                </AuthModalSmallPrint>
            </AuthModalBody>
        </SlideFade>
    );
};
