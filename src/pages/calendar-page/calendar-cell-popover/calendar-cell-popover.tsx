import { Popover, PopoverProps } from 'antd';
import cn from 'classnames';
import styles from './calendar-cell-popover.module.less';

type CalendarCellPopoverProps = PopoverProps & {
    modal?: boolean;
};

export const CalendarCellPopover = ({
    modal,
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
        {...props}
    >
        <div style={{ position: 'absolute', inset: 0 }} />
    </Popover>
);
