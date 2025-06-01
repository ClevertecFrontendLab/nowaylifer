import { chakra } from '@chakra-ui/react';

import imageUrl from '~/shared/assets/party.png';
import {
    AppModalBody,
    AppModalCloseButton,
    AppModalContent,
    AppModalDescription,
    AppModalImage,
    AppModalSmallPrint,
    AppModalTitle,
} from '~/shared/infra/modals-manager';
import { TestId } from '~/shared/test-ids';
import { Link } from '~/shared/ui/link';

export const SignUpSuccessModalContent = ({ email }: { email: string }) => (
    <AppModalContent data-test-id={TestId.SIGN_UP_SUCCESS_MODAL}>
        <AppModalCloseButton data-test-id={TestId.MODAL_CLOSE_BUTTON} />
        <AppModalBody>
            <AppModalImage src={imageUrl} />
            <AppModalTitle>Остался последний шаг. Нужно верифицировать ваш e-mail</AppModalTitle>
            <AppModalDescription>
                Мы отправили вам на почту
                <chakra.b display='block' fontWeight='semibold' isTruncated>
                    {email}
                </chakra.b>
                ссылку для верификации.
            </AppModalDescription>
            <AppModalSmallPrint>
                Не пришло письмо? Проверьте&nbsp;папку&nbsp;Спам.
                <br />
                По другим вопросам свяжитесь{' '}
                <Link to='/' textDecoration='underline' whiteSpace='nowrap'>
                    с поддержкой.
                </Link>
            </AppModalSmallPrint>
        </AppModalBody>
    </AppModalContent>
);
