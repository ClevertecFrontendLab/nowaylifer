import { ModalOverlayProps, ModalProps } from '@chakra-ui/react';
import { createContext, MaybeRenderProp } from '@chakra-ui/utils';

export interface ContextModalProps extends Omit<ModalProps, 'isOpen' | 'onClose' | 'children'> {
    content?: MaybeRenderProp<{ onClose: () => void }>;
    overlayProps?: ModalOverlayProps;
}

export interface ModalsContext {
    openModal: (props: ContextModalProps) => void;
    closeModal: () => void;
}

export const [ModalsContextProvider, useModal] = createContext<ModalsContext>();
