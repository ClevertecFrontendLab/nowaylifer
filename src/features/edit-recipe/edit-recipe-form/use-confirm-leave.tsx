import { useCallbackRef } from '@chakra-ui/react';
import { runIfFn } from '@chakra-ui/utils';
import { useCallback, useEffect, useRef } from 'react';
import { Blocker, BlockerFunction, useBlocker } from 'react-router';

import { useModal } from '~/shared/infra/modals-manager';

import { LeaveConfirmDialog } from './leave-confirm-dialog';

export interface UseConfirmLeaveOptions {
    blockLeave?: BlockerFunction | boolean;
    onLeave?: () => void;
    onSave?: (arg: { closeModal: () => void; blocker: Blocker }) => void;
}

export const useConfirmLeave = ({
    blockLeave = false,
    onLeave,
    onSave,
}: UseConfirmLeaveOptions = {}) => {
    const unblockRef = useRef(false);
    const { openModal, closeModal } = useModal();

    const blockerFn: BlockerFunction = useCallback(
        (args) => {
            const isBlocking = runIfFn(blockLeave, args);
            return isBlocking && !unblockRef.current;
        },
        [blockLeave],
    );

    const blocker = useBlocker(blockerFn);

    const unblockNavigation = useCallback(() => {
        unblockRef.current = true;
    }, []);

    const stableOnLeave = useCallbackRef(onLeave);
    const stableOnSave = useCallbackRef(onSave);

    useEffect(() => {
        if (blocker.state !== 'blocked') return;

        const handleLeave = () => {
            closeModal();
            blocker.proceed();
            stableOnLeave?.();
        };

        openModal({
            content: (
                <LeaveConfirmDialog
                    onLeave={handleLeave}
                    onSave={() => stableOnSave?.({ closeModal, blocker })}
                />
            ),
        });
    }, [blocker, openModal, closeModal, stableOnLeave, stableOnSave]);

    return { blocker, unblockNavigation };
};
