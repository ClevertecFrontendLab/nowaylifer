import { ModalProps } from '@components/modal';
import { ResultModal } from '@components/result-modal';
import { Button } from 'antd';

export const AddReviewSuccessModal = ({ onOk, ...props }: ModalProps) => (
    <ResultModal
        resultProps={{
            status: 'success',
            title: 'Отзыв успешно опубликован',
            extra: (
                <Button block={true} onClick={onOk} size='large' type='primary'>
                    Отлично
                </Button>
            ),
        }}
        {...props}
    />
);

export const AddReviewErrorModal = ({
    onRetry,
    onCancel,
    ...props
}: ModalProps & { onRetry?: () => void }) => (
    <ResultModal
        resultProps={{
            status: 'error',
            title: 'Данные не сохранились',
            subTitle: 'Что-то пошло не так. Попробуйте ещё раз.',
            extra: (
                <div style={{ display: 'flex', gap: 8 }}>
                    <Button
                        block={true}
                        data-test-id='write-review-not-saved-modal'
                        onClick={onRetry}
                        size='large'
                        type='primary'
                    >
                        Написать отзыв
                    </Button>
                    <Button block={true} onClick={onCancel} size='large'>
                        Закрыть
                    </Button>
                </div>
            ),
        }}
        {...props}
    />
);
