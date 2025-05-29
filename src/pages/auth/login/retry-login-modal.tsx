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

export const RetryLoginModalContent = ({ onRetry }: { onRetry?: () => void }) => (
    <AppModalContent data-test-id={TestId.SIGN_IN_ERROR_MODAL}>
        <AppModalCloseButton data-test-id={TestId.MODAL_CLOSE_BUTTON} />
        <AppModalBody>
            <AppModalImage src={imageUrl} />
            <AppModalTitle>Вход не выполнен</AppModalTitle>
            <AppModalDescription color='blackAlpha.700'>
                Что-то пошло не так.
                <br />
                Попробуйте еще раз
            </AppModalDescription>
            <Button
                variant='inverted'
                w='full'
                size='lg'
                onClick={onRetry}
                data-test-id={TestId.SIGN_IN_REPEAT_BUTTON}
            >
                Повторить
            </Button>
        </AppModalBody>
    </AppModalContent>
);
