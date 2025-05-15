import { Button } from '@chakra-ui/react';

import { TestId } from '~/shared/test-ids';

import imageUrl from '../assets/breakfast.png';
import {
    AuthModalBody,
    AuthModalCloseButton,
    AuthModalContent,
    AuthModalDescription,
    AuthModalImage,
    AuthModalTitle,
} from '../common/auth-modal';

export const RetryLoginModalContent = ({ onRetry }: { onRetry?: () => void }) => (
    <AuthModalContent data-test-id={TestId.SIGN_IN_ERROR_MODAL}>
        <AuthModalCloseButton data-test-id={TestId.MODAL_CLOSE_BUTTON} />
        <AuthModalBody>
            <AuthModalImage src={imageUrl} />
            <AuthModalTitle>Вход не выполнен</AuthModalTitle>
            <AuthModalDescription color='blackAlpha.700'>
                Что-то пошло не так.
                <br />
                Попробуйте еще раз
            </AuthModalDescription>
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
