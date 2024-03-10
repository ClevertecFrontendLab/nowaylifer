import { ResultModal } from '@components/result-modal';
import { ModalProps, Button } from 'antd';

export const ServerErrorModal = ({ onCancel, ...props }: ModalProps) => (
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
