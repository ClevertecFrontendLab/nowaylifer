import { Popover, PopoverProps } from 'antd';
import { ComponentProps } from 'react';

type CalendarPopoverProps = PopoverProps & {
    triggerProps?: ComponentProps<'div'>;
};

export const CalendarPopover = ({ triggerProps, ...props }: CalendarPopoverProps) => (
    <Popover
        trigger='click'
        showArrow={false}
        destroyTooltipOnHide
        overlayStyle={{ width: 200 }}
        align={{ points: ['tl', 'tl'] }}
        getPopupContainer={(triggerNode) => triggerNode}
        {...props}
    >
        <div style={{ position: 'absolute', inset: 0, ...triggerProps?.style }} {...triggerProps} />
    </Popover>
);
