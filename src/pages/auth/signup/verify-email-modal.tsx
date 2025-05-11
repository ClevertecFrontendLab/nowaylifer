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

export const VerifyEmailModalContent = ({ email }: { email: string }) => (
    <AuthModalContent>
        <AuthModalCloseButton />
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
