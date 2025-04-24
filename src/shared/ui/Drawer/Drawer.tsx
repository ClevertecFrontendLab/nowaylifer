import { Drawer as DrawerBase, DrawerProps as DrawerBaseProps } from '@chakra-ui/react';
import React, { useImperativeHandle, useMemo, useState } from 'react';

import { DrawerContextProvider, DrawerContextType, useDrawerContext } from './drawer-context';

export interface DrawerHandle {
    close: () => void;
    open: () => void;
}

export interface DrawerContextProps {
    ref?: React.Ref<DrawerHandle>;
    children?: React.ReactNode;
}

export const DrawerContext = ({ ref, children }: DrawerContextProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const context: DrawerContextType = useMemo(
        () => ({
            close: () => setIsOpen(false),
            open: () => setIsOpen(true),
            isOpen: isOpen,
        }),
        [setIsOpen, isOpen],
    );

    useImperativeHandle(ref, () => ({ close: context.close, open: context.open }));

    return <DrawerContextProvider value={context}>{children}</DrawerContextProvider>;
};

export interface DrawerProps extends Omit<DrawerBaseProps, 'isOpen' | 'onClose'> {}

export const Drawer = (props: DrawerProps) => {
    const { close, isOpen } = useDrawerContext();
    return <DrawerBase isOpen={isOpen} onClose={close} {...props}></DrawerBase>;
};
