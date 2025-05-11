import { Modal, ModalOverlay, useBoolean } from '@chakra-ui/react';
import { runIfFn } from '@chakra-ui/utils';
import { useMemo, useState } from 'react';

import { ContextModalProps, ModalsContext, ModalsContextProvider } from './context';

export interface ModalsProviderProps {
    children?: React.ReactNode;
    defaultModalProps?: ContextModalProps;
}

export const ModalsProvider = ({ children, defaultModalProps }: ModalsProviderProps) => {
    const [currentModalProps, setCurrentModalProps] = useState<ContextModalProps | undefined>(
        defaultModalProps,
    );
    const [isOpen, { on: open, off: close }] = useBoolean(false);

    const ctx: ModalsContext = useMemo(
        () => ({
            closeModal: () => close(),
            openModal: (props) => {
                setCurrentModalProps({ ...defaultModalProps, ...props });
                open();
            },
        }),
        [close, open, defaultModalProps],
    );

    const { content, overlayProps, ...modalProps } = currentModalProps ?? {};

    return (
        <ModalsContextProvider value={ctx}>
            <Modal isOpen={isOpen} onClose={close} {...modalProps}>
                <ModalOverlay {...overlayProps} />
                {runIfFn(content, { onClose: ctx.closeModal })}
            </Modal>
            {children}
        </ModalsContextProvider>
    );
};
