import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useBlocker } from 'react-router';

import { useModal } from '~/shared/infra/modals-manager';

import { RecipeDraft } from '../types';
import { LeaveConfirmDialog } from './leave-confirm-dialog';
import { useSaveRecipeDraft } from './use-save-recipe-draft';

export const useLeaveBlocker = (form: UseFormReturn<RecipeDraft>) => {
    const blocker = useBlocker(form.formState.isDirty);
    const saveDraft = useSaveRecipeDraft(form);
    const { openModal, closeModal } = useModal();

    useEffect(() => {
        if (blocker.state !== 'blocked') return;

        const handleLeave = () => {
            closeModal();
            blocker.proceed();
        };

        const handleSave = async () => {
            const { success, error } = await saveDraft();

            if (success || error === 'formInvalid') {
                closeModal();
            }

            if (success) {
                blocker.proceed();
            }
        };

        openModal({
            content: <LeaveConfirmDialog onLeave={handleLeave} onSave={handleSave} />,
        });
    }, [blocker, form, openModal, closeModal, saveDraft]);
};
