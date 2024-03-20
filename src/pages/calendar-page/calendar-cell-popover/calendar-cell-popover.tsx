import { createDestroyObserver } from '@utils/destroy-observer';
import { Popover, PopoverProps } from 'antd';
import cn from 'classnames';
import { useLayoutEffect, useRef, useState } from 'react';
import styles from './calendar-cell-popover.module.less';

type CalendarCellPopoverProps = PopoverProps & {
    modal?: boolean;
    onDestroy?(): void;
};

const isOverlayNode = (node: Node) =>
    node instanceof HTMLElement && node.className.includes('ant-popover');

export const CalendarCellPopover = ({
    modal,
    content,
    overlayClassName,
    onDestroy,
    ...props
}: CalendarCellPopoverProps) => {
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const [observer, setObserver] = useState(() =>
        onDestroy ? createDestroyObserver(isOverlayNode, onDestroy) : null,
    );

    if (onDestroy && !observer) {
        setObserver(createDestroyObserver(isOverlayNode, onDestroy));
    } else if (!onDestroy && observer) {
        setObserver(null);
    }

    useLayoutEffect(() => {
        if (props.open && triggerRef.current) {
            observer?.observe(triggerRef.current, { childList: true, subtree: true });
        }
    }, [props.open, observer]);

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
