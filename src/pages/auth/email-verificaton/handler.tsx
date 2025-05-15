import { useEffect } from 'react';

import { useModal } from '~/shared/infra/modals-manager';

import { useAuthToast } from '../context';
import { EmailVerificationFailedModalContent } from './failed-modal';
import { emailVerificationHistoryState } from './history-state';

export const EmailVerificationResultHandler = () => {
    const { openModal } = useModal();
    const toast = useAuthToast();

    useEffect(() => {
        const isEmailVerified = emailVerificationHistoryState.getState();
        if (isEmailVerified == null) return;

        if (isEmailVerified) {
            toast({ status: 'success', title: 'Верификация прошла успешно' });
        } else {
            openModal({ content: <EmailVerificationFailedModalContent /> });
        }

        emailVerificationHistoryState.clearState();
    }, [openModal, toast]);

    return null;
};
