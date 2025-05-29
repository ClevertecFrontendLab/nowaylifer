import { chakra, HStack, PinInput, PinInputField, SlideFade } from '@chakra-ui/react';
import { useState } from 'react';

import { isClientError } from '~/shared/api/util';
import imageUrl from '~/shared/assets/gaming-on-portable-console.png';
import { useAppLoader } from '~/shared/infra/app-loader';
import {
    AppModalBody,
    AppModalDescription,
    AppModalImage,
    AppModalSmallPrint,
    AppModalTitle,
} from '~/shared/infra/modals-manager';
import { TestId } from '~/shared/test-ids';

import { authApi } from '../api';

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
            <AppModalBody>
                <AppModalImage src={imageUrl} />
                {isInvalid && <AppModalTitle>Неверный код</AppModalTitle>}
                <AppModalDescription mb={4}>
                    Мы отправили вам на e-mail
                    <chakra.b display='block' fontWeight='semibold' isTruncated>
                        {email}
                    </chakra.b>
                    шестизначный код. Введите&nbsp;его&nbsp;ниже.
                </AppModalDescription>
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
                <AppModalSmallPrint>
                    Не пришло письмо? Проверьте&nbsp;папку&nbsp;Спам.
                </AppModalSmallPrint>
            </AppModalBody>
        </SlideFade>
    );
};
