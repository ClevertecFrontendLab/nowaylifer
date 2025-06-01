import { Modal, ModalOverlay } from '@chakra-ui/react';
import { runIfFn } from '@chakra-ui/utils';
import { useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '~/shared/store';

import { ContextModalProps, ModalsContext, ModalsContextProvider } from './context';
import { selectIsModalOpen, setIsModalOpen } from './slice';

export interface ModalsProviderProps {
    children?: React.ReactNode;
    defaultModalProps?: ContextModalProps;
}

export const ModalsProvider = ({ children, defaultModalProps }: ModalsProviderProps) => {
    const [currentModalProps, setCurrentModalProps] = useState<ContextModalProps | undefined>(
        defaultModalProps,
    );

    const isOpen = useAppSelector(selectIsModalOpen);
    const dispatch = useAppDispatch();

    const ctx: ModalsContext = useMemo(
        () => ({
            closeModal: () => dispatch(setIsModalOpen(false)),
            openModal: (props) => {
                setCurrentModalProps({ ...defaultModalProps, ...props });
                dispatch(setIsModalOpen(true));
            },
        }),
        [defaultModalProps, dispatch],
    );

    const { content, overlayProps, ...modalProps } = currentModalProps ?? {};

    return (
        <ModalsContextProvider value={ctx}>
            <Modal
                isOpen={isOpen}
                onClose={ctx.closeModal}
                onCloseComplete={() => {
                    currentModalProps?.onCloseComplete?.();
                    setCurrentModalProps(defaultModalProps);
                }}
                {...modalProps}
            >
                <ModalOverlay {...overlayProps} />
                {runIfFn(content, { onClose: ctx.closeModal })}
            </Modal>
            {children}
        </ModalsContextProvider>
    );
};
