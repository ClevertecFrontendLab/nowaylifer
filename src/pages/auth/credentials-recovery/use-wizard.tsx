import { useCallback } from 'react';

import { useModal } from '~/shared/infra/modals-manager';

import { useAuthToast } from '../context';
import { CredentialsRecoveryWizard } from './wizard';

export const useCredentialsRecoveryWizard = () => {
    const { openModal, closeModal } = useModal();
    const toast = useAuthToast();

    const handleComplete = useCallback(() => {
        toast({ status: 'success', title: 'Восстановление данных успешно' });
        closeModal();
    }, [closeModal, toast]);

    return {
        closeWizar: closeModal,
        openWizard: () =>
            openModal({ content: <CredentialsRecoveryWizard onComplete={handleComplete} /> }),
    };
};
