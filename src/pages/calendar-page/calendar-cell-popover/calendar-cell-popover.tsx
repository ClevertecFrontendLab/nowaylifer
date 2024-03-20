import { skipToken, useMutationObserver } from '@hooks/useMutationObserver';
import { Popover, PopoverProps } from 'antd';
import cn from 'classnames';
import { useRef } from 'react';
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
            trigger='click'
            showArrow={false}
            destroyTooltipOnHide
            placement={modal ? 'bottom' : undefined}
            getPopupContainer={(triggerNode) => triggerNode}
            align={modal ? undefined : { points: ['tl', 'tl'] }}
            overlayClassName={cn(overlayClassName, modal && styles.ModalMode)}
            content={<div title=''>{typeof content === 'function' ? content() : content}</div>}
            {...props}
        >
            <div className={styles.PopoverTrigger} ref={triggerRef} />
        </Popover>
    );
};
