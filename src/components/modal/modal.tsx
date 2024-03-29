import { ButtonProps, Modal as ModalAntd, ModalFuncProps, ModalProps } from 'antd';

export type { ModalProps } from 'antd';

const defaultModalProps: ModalProps = {
    centered: true,
    okButtonProps: { size: 'large' },
    maskStyle: {
        backdropFilter: 'var(--modal-backdrop-filter)',
        background: 'var(--modal-backdrop-color)',
    },
};

const ModalInner = (props: ModalProps) => <ModalAntd {...defaultModalProps} {...props} />;

type ModalFuncPropsCustom = Omit<ModalFuncProps, 'okButtonProps'> & {
    okButtonProps?: ButtonProps & { [key: `data-${string}`]: string | undefined };
};

const error = (props?: ModalFuncPropsCustom) =>
    ModalAntd.error({ ...defaultModalProps, okText: 'Закрыть', ...props });

const info = (props?: ModalFuncPropsCustom) => ModalAntd.info({ ...defaultModalProps, ...props });

export const Modal = Object.assign(ModalInner, { error, info });
