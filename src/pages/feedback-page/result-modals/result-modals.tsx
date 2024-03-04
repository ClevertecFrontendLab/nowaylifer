import { Modal, ModalProps } from '@components/modal';
import { Button, Result, ResultProps } from 'antd';
import cn from 'classnames';
import styles from './result-modals.module.less';

export const ResultModal = ({
    resultProps,
    className,
    ...props
}: ModalProps & { resultProps?: ResultProps }) => (
    <Modal
        centered
        footer={null}
        closable={false}
        className={cn(styles.ModalResult, className)}
        {...props}
    >
        <Result {...resultProps} />
    </Modal>
);

export const AddReviewSuccessModal = ({ onOk, ...props }: ModalProps) => (
    <ResultModal
        resultProps={{
            status: 'success',
            title: 'Отзыв успешно опубликован',
            extra: (
                <Button block type='primary' size='large' onClick={onOk}>
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
                    <Button block type='primary' size='large' onClick={onRetry}>
                        Написать отзыв
                    </Button>
                    <Button block size='large' onClick={onCancel}>
                        Закрыть
                    </Button>
                </div>
            ),
        }}
        {...props}
    />
);

export const FetchReviewsErrorModal = ({ onCancel, ...props }: ModalProps) => (
    <ResultModal
        resultProps={{
            status: 500,
            title: 'Что-то пошло не так',
            subTitle: 'Произошла ошибка, попробуйте ещё раз.',
            extra: (
                <Button type='primary' size='large' onClick={onCancel}>
                    Назад
                </Button>
            ),
        }}
        {...props}
    />
);
