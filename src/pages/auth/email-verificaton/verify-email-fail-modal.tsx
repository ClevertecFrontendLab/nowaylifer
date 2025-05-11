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

export const VerifyEmailFailModalContent = () => (
    <AuthModalContent>
        <AuthModalCloseButton />
        <AuthModalBody>
            <AuthModalImage src='/images/verify-email-error.jpg' />
            <AuthModalTitle>Упс! Что-то пошло не так</AuthModalTitle>
            <AuthModalDescription>
                Ваша ссылка для верификации недействительна. Попробуйте зарегистрироваться снова.
            </AuthModalDescription>
            <AuthModalSmallPrint>
                Остались вопросы? Свяжитесь{' '}
                <Link to='/' textDecoration='underline'>
                    с поддержкой.
                </Link>
            </AuthModalSmallPrint>
        </AuthModalBody>
    </AuthModalContent>
);
