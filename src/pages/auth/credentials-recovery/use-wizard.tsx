import { useCallback } from 'react';

import { useModal } from '~/shared/infra/modals-manager';
import { toast } from '~/shared/infra/toast';

import { CredentialsRecoveryWizard } from './wizard';

export const useCredentialsRecoveryWizard = () => {
    const { openModal, closeModal } = useModal();

    const handleComplete = useCallback(() => {
        toast({ status: 'success', title: 'Восстановление данных успешно' });
        closeModal();
    }, [closeModal]);

    return {
        closeWizar: closeModal,
        openWizard: () =>
            openModal({ content: <CredentialsRecoveryWizard onComplete={handleComplete} /> }),
    };
};
