import React from 'react';

import { useDrawerContext } from './drawer-context';

interface DrawerTriggerChildProps {
    ref?: React.Ref<HTMLButtonElement>;
    onClick?: () => void;
}

export const DrawerTrigger = ({
    children,
}: {
    children: React.ReactElement<DrawerTriggerChildProps>;
}) => {
    const { open } = useDrawerContext();
    return React.Children.map(children, (child) =>
        React.isValidElement<DrawerTriggerChildProps>(child)
            ? React.cloneElement<DrawerTriggerChildProps>(child, { onClick: open })
            : child,
    );
};
