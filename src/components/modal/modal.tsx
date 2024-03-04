import { Modal as ModalAntd, ModalProps } from 'antd';

export type { ModalProps } from 'antd';

export const Modal = (props: ModalProps) => (
    <ModalAntd
        maskStyle={{
            backdropFilter: 'var(--modal-backdrop-filter)',
            background: 'var(--modal-backdrop-color)',
        }}
        {...props}
    />
);
