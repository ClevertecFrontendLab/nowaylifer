import { Popover, PopoverProps } from 'antd';
import cn from 'classnames';
import styles from './calendar-cell-popover.module.less';

type CalendarCellPopoverProps = PopoverProps & {
    modal?: boolean;
};

export const CalendarCellPopover = ({
    modal,
    content,
    overlayClassName,
    ...props
}: CalendarCellPopoverProps) => (
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
        <div className={styles.PopoverTrigger} />
    </Popover>
);
