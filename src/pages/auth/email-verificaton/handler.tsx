import { useEffect } from 'react';

import { useModal } from '~/shared/infra/modals-manager';
import { createHistoryStore } from '~/shared/router';

import { useAuthToast } from '../context';
import { EmailVerificationFailedModalContent } from './failed-modal';
import { EmailVerificationHistoryState } from './history-state';

export const EmailVerificationResultHandler = () => {
    const { openModal } = useModal();
    const toast = useAuthToast();

    useEffect(() => {
        const historyStore = createHistoryStore<EmailVerificationHistoryState>();
        const isEmailVerified = historyStore.get().emailVerified;
        if (isEmailVerified == null) return;

        if (isEmailVerified) {
            toast({ status: 'success', title: 'Верификация прошла успешно' });
        } else {
            openModal({ content: <EmailVerificationFailedModalContent /> });
        }

        historyStore.delete('emailVerified');
    }, [openModal, toast]);

    return null;
};
