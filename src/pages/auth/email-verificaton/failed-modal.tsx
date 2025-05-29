import imageUrl from '~/shared/assets/coffee-tea.png';
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

export const EmailVerificationFailedModalContent = () => (
    <AppModalContent data-test-id={TestId.EMAIL_VERIFICATION_FAILED_MODAL}>
        <AppModalCloseButton data-test-id={TestId.MODAL_CLOSE_BUTTON} />
        <AppModalBody>
            <AppModalImage src={imageUrl} />
            <AppModalTitle>Упс! Что-то пошло не так</AppModalTitle>
            <AppModalDescription color='blackAlpha.700'>
                Ваша ссылка для верификации недействительна. Попробуйте зарегистрироваться снова.
            </AppModalDescription>
            <AppModalSmallPrint>
                Остались вопросы? Свяжитесь{' '}
                <Link to='/' textDecoration='underline' whiteSpace='nowrap'>
                    с поддержкой.
                </Link>
            </AppModalSmallPrint>
        </AppModalBody>
    </AppModalContent>
);
