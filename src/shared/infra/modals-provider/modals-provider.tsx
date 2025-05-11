import { Modal, ModalOverlay, useBoolean } from '@chakra-ui/react';
import { runIfFn } from '@chakra-ui/utils';
import { useMemo, useState } from 'react';

import { ContextModalProps, ModalsContext, ModalsContextProvider } from './context';

export const ModalsProvider = ({ children }: { children?: React.ReactNode }) => {
    const [currentModalProps, setCurrentModalProps] = useState<ContextModalProps>();
    const [isOpen, { on: open, off: close }] = useBoolean(false);
    console.log(isOpen);

    const ctx: ModalsContext = useMemo(
        () => ({
            closeModal: () => {
                console.log('close');
                return close();
            },
            openModal: (props) => {
                setCurrentModalProps(props);
                open();
            },
        }),
        [close, open],
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
