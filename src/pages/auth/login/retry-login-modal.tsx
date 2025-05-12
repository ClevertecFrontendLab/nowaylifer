import { Button } from '@chakra-ui/react';

import { TestId } from '~/shared/test-ids';

import {
    AuthModalBody,
    AuthModalCloseButton,
    AuthModalContent,
    AuthModalDescription,
    AuthModalImage,
    AuthModalTitle,
} from '../common/auth-modal';

export const RetryLoginModalContent = ({ onRetry }: { onRetry: () => void }) => (
    <AuthModalContent data-test-id={TestId.SIGN_IN_ERROR_MODAL}>
        <AuthModalCloseButton data-test-id={TestId.MODAL_CLOSE_BUTTON} />
        <AuthModalBody>
            <AuthModalImage src='/images/american-breakfast.png' />
            <AuthModalTitle>Вход не выполнене</AuthModalTitle>
            <AuthModalDescription>Что-то пошло не так. Попробуйте еще раз</AuthModalDescription>
            <Button
                variant='inverted'
                w='full'
                size='lg'
                onClick={onRetry}
                data-test-id={TestId.SIGN_IN_REPEAT_BUTTON}
            >
                Повторить
            </Button>
        </AuthModalBody>
    </AuthModalContent>
);
