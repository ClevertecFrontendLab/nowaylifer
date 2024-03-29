import { useRef } from 'react';
import { skipToken, useMutationObserver } from '@hooks/use-mutation-observer';
import { Popover, PopoverProps } from 'antd';
import cn from 'classnames';

import styles from './calendar-cell-popover.module.less';

type CalendarCellPopoverProps = PopoverProps & {
    modal?: boolean;
    onDestroy?(): void;
};

export const CalendarCellPopover = ({
    modal,
    content,
    overlayClassName,
    onDestroy,
    ...props
}: CalendarCellPopoverProps) => {
    const triggerRef = useRef<HTMLDivElement>(null);

    useMutationObserver(
        triggerRef,
        (mutations, observer) => {
            const isDestroyed = mutations.find(({ removedNodes }) =>
                [...removedNodes].find(
                    (node) => node instanceof HTMLElement && node.classList.contains('ant-popover'),
                ),
            );

            if (isDestroyed) {
                observer.disconnect();
                onDestroy?.();
            }
        },
        { childList: true, subtree: true, skip: onDestroy ? undefined : skipToken },
    );

    return (
        <Popover
            align={modal ? undefined : { points: ['tl', 'tl'] }}
            content={<div title=''>{typeof content === 'function' ? content() : content}</div>}
            destroyTooltipOnHide={true}
            getPopupContainer={(triggerNode) => triggerNode}
            overlayClassName={cn(overlayClassName, modal && styles.ModalMode)}
            placement={modal ? 'bottom' : undefined}
            showArrow={false}
            trigger='click'
            {...props}
        >
            <div ref={triggerRef} className={styles.PopoverTrigger} />
        </Popover>
    );
};
