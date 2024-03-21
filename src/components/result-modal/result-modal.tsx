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
        centered={true}
        className={cn(styles.ResultModal, className)}
        closable={false}
        footer={null}
        {...props}
    >
        <Result {...resultProps} />
    </Modal>
);
