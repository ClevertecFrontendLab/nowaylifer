import { useEffect } from 'react';

import { useModal } from '~/shared/infra/modals-manager';
import { toast } from '~/shared/infra/toast';

import { emailVerificationHistoryState } from './email-verification-history-state';
import { VerifyEmailFailModalContent } from './verify-email-fail-modal';

export const useHandleEmailVerification = () => {
    const { openModal } = useModal();

    useEffect(() => {
        const isEmailVerified = emailVerificationHistoryState.getState();
        if (isEmailVerified == null) return;

        if (isEmailVerified) {
            toast({ status: 'success', title: 'Верификация прошла успешно' });
        } else {
            openModal({ content: <VerifyEmailFailModalContent /> });
        }

        emailVerificationHistoryState.clearState();
    }, [openModal]);
};
