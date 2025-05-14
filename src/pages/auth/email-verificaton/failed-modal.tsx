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

export const EmailVerificationFailedModalContent = () => (
    <AuthModalContent data-test-id={TestId.EMAIL_VERIFICATION_FAILED_MODAL}>
        <AuthModalCloseButton data-test-id={TestId.MODAL_CLOSE_BUTTON} />
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
