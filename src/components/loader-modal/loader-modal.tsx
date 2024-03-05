import { Loader } from '@components/loader';
import { Modal, ModalProps } from 'antd';
import styles from './loader-modal.module.less';

export const LoaderModal = ({ mask = true, open }: Pick<ModalProps, 'open' | 'mask'>) => (
    <Modal
        open={open}
        mask={mask}
        centered
        maskClosable={false}
        destroyOnClose
        modalRender={() => <Loader />}
        maskStyle={{
            backdropFilter: 'var(--loader-backdrop-filter)',
            background: 'var(--loader-backdrop-color)',
        }}
        zIndex={2000}
        className={styles.Modal}
    />
);
