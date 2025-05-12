import { TestId } from '~/shared/test-ids';
import { Link } from '~/shared/ui/link';

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
            <AuthModalImage src='/images/verify-email.png' />
            <AuthModalTitle>Остался последний шаг. Нужно верифицировать ваш e-mail</AuthModalTitle>
            <AuthModalDescription>
                Мы отправили вам на почту <b>{email}</b> ссылку для верификации.
            </AuthModalDescription>
            <AuthModalSmallPrint>
                Не пришло письмо? Проверьте папку Спам. По другим вопросам свяжитесь{' '}
                <Link to='/' textDecoration='underline'>
                    с поддержкой.
                </Link>
            </AuthModalSmallPrint>
        </AuthModalBody>
    </AuthModalContent>
);
