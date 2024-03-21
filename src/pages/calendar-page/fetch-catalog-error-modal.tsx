import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Modal } from '@components/modal';
import { ButtonProps, ModalFuncProps, Typography } from 'antd';

const okButtonProps = { 'data-test-id': 'modal-error-user-training-button' } as ButtonProps;

export const showFetchCatalogErrorModal = (props?: ModalFuncProps) =>
    Modal.error({
        okButtonProps,
        closable: true,
        okText: 'Обновить',
        icon: <CloseCircleOutlined style={{ color: 'var(--theme-primary-light-6)' }} />,
        closeIcon: <CloseOutlined data-test-id='modal-error-user-training-button-close' />,
        title: (
            <Typography.Text data-test-id='modal-error-user-training-title'>
                При открытии данных произошла ошибка
            </Typography.Text>
        ),
        content: (
            <Typography.Paragraph
                data-test-id='modal-error-user-training-subtitle'
                type='secondary'
            >
                Попробуйте ещё раз.
            </Typography.Paragraph>
        ),
        ...props,
    });
