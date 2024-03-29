import { Loader } from '@components/loader';
import { Modal, ModalProps } from 'antd';

import styles from './loader-modal.module.less';

export const LoaderModal = ({ mask = true, open }: Pick<ModalProps, 'open' | 'mask'>) => (
    <Modal
        centered={true}
        className={styles.Modal}
        destroyOnClose={true}
        mask={mask}
        maskClosable={false}
        maskStyle={{
            backdropFilter: 'var(--loader-backdrop-filter)',
            background: 'var(--loader-backdrop-color)',
        }}
        modalRender={() => <Loader />}
        open={open}
        zIndex={2000}
    />
);
