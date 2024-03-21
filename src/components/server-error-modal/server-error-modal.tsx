import { ResultModal } from '@components/result-modal';
import { Button,ModalProps } from 'antd';

export const ServerErrorModal = ({ onCancel, ...props }: ModalProps) => (
    <ResultModal
        resultProps={{
            status: 500,
            title: 'Что-то пошло не так',
            subTitle: 'Произошла ошибка, попробуйте ещё раз.',
            extra: (
                <Button onClick={onCancel} size='large' type='primary'>
                    Назад
                </Button>
            ),
        }}
        {...props}
    />
);
