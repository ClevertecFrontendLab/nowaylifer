import { Modal } from '@components/modal';
import { ModalProps, Result, ResultProps } from 'antd';
import cn from 'classnames';
import styles from './result-modal.module.less';

export const ResultModal = ({
    resultProps,
    className,
    ...props
}: ModalProps & { resultProps?: ResultProps }) => (
    <Modal
        centered
        footer={null}
        closable={false}
        className={cn(styles.ResultModal, className)}
        {...props}
    >
        <Result {...resultProps} />
    </Modal>
);
