import { Button } from '@chakra-ui/react';

import {
    AuthModalBody,
    AuthModalCloseButton,
    AuthModalContent,
    AuthModalDescription,
    AuthModalImage,
    AuthModalTitle,
} from '../common/auth-modal';

export const RetryLoginModalContent = ({ onRetry }: { onRetry: () => void }) => (
    <AuthModalContent>
        <AuthModalCloseButton />
        <AuthModalBody>
            <AuthModalImage src='/images/retry-login.png' />
            <AuthModalTitle>Вход не выполнене</AuthModalTitle>
            <AuthModalDescription>Что-то пошло не так. Попробуйте еще раз</AuthModalDescription>
            <Button variant='inverted' w='full' size='lg' onClick={onRetry}>
                Повторить
            </Button>
        </AuthModalBody>
    </AuthModalContent>
);
