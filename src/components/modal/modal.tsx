import { Modal as ModalAntd, ModalFuncProps, ModalProps } from 'antd';

export type { ModalProps } from 'antd';

const defaultModalProps = {
    centered: true,
    maskStyle: {
        backdropFilter: 'var(--modal-backdrop-filter)',
        background: 'var(--modal-backdrop-color)',
    },
};

const ModalInner = (props: ModalProps) => <ModalAntd {...defaultModalProps} {...props} />;

const error = (props?: ModalFuncProps) => ModalAntd.error({ ...defaultModalProps, ...props });
const info = (props?: ModalFuncProps) => ModalAntd.info({ ...defaultModalProps, ...props });

export const Modal = Object.assign(ModalInner, { error, info });
