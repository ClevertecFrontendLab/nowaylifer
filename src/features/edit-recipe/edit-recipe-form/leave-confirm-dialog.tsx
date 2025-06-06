import { Button } from '@chakra-ui/react';

import imageUrl from '~/shared/assets/breakfast.png';
import {
    AppModalBody,
    AppModalCloseButton,
    AppModalContent,
    AppModalDescription,
    AppModalImage,
    AppModalTitle,
} from '~/shared/infra/modals-manager';
import { TestId } from '~/shared/test-ids';
import { EditIcon } from '~/shared/ui/icons/edit';

export interface LeaveConfirmDialogProps {
    onLeave?: () => void;
    onSave?: () => void;
}

export const LeaveConfirmDialog = ({ onLeave, onSave }: LeaveConfirmDialogProps) => (
    <AppModalContent data-test-id={TestId.PREVENTIVE_MODAL}>
        <AppModalCloseButton data-test-id={TestId.MODAL_CLOSE_BUTTON} />
        <AppModalBody>
            <AppModalImage src={imageUrl} />
            <AppModalTitle>Выйти без сохранения?</AppModalTitle>
            <AppModalDescription color='blackAlpha.700'>
                Чтобы сохранить, нажмите кнопку сохранить черновик
            </AppModalDescription>
            <Button size='lg' variant='inverted' leftIcon={<EditIcon />} onClick={onSave} mb={4}>
                Сохранить черновик
            </Button>
            <Button size='lg' variant='ghost' onClick={onLeave}>
                Выйти без сохранения
            </Button>
        </AppModalBody>
    </AppModalContent>
);
