import { chakra } from '@chakra-ui/react';

import { TestId } from '~/shared/test-ids';
import { Link } from '~/shared/ui/link';

import imageUrl from '../assets/party.png';
import {
    AuthModalBody,
    AuthModalCloseButton,
    AuthModalContent,
    AuthModalDescription,
    AuthModalImage,
    AuthModalSmallPrint,
    AuthModalTitle,
} from '../common/auth-modal';

export const SignUpSuccessModalContent = ({ email }: { email: string }) => (
    <AuthModalContent data-test-id={TestId.SIGN_UP_SUCCESS_MODAL}>
        <AuthModalCloseButton data-test-id={TestId.MODAL_CLOSE_BUTTON} />
        <AuthModalBody>
            <AuthModalImage src={imageUrl} />
            <AuthModalTitle>Остался последний шаг. Нужно верифицировать ваш e-mail</AuthModalTitle>
            <AuthModalDescription>
                Мы отправили вам на почту
                <chakra.b display='block' fontWeight='semibold' isTruncated>
                    {email}
                </chakra.b>
                ссылку для верификации.
            </AuthModalDescription>
            <AuthModalSmallPrint>
                Не пришло письмо? Проверьте&nbsp;папку&nbsp;Спам.
                <br />
                По другим вопросам свяжитесь{' '}
                <Link to='/' textDecoration='underline' whiteSpace='nowrap'>
                    с поддержкой.
                </Link>
            </AuthModalSmallPrint>
        </AuthModalBody>
    </AuthModalContent>
);
