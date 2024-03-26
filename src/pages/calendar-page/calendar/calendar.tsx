import { useState } from 'react';
import { useXs } from '@hooks/use-breakpoint';
import { Calendar } from 'antd';
import cn from 'classnames';
import moment, { Moment } from 'moment';

import { TrainingCalendarCell } from '../training-menu/training-calendar-cell';
import { TrainingPopover } from '../training-menu/training-popover';
import { TrainingProvider } from '../training-menu/training-provider';

import styles from './calendar.module.less';

type TrainingCalendarProps = {
    disabled?: boolean;
};

export const TrainingCalendar = ({ disabled }: TrainingCalendarProps) => {
    const [selectedDate, setSelectedDate] = useState<Moment | undefined>(moment);
    const xs = useXs();
    const isCalendarFullScreen = !xs;

    const renderCellContent = (date: Moment) =>
        (isCalendarFullScreen || date.isSame(selectedDate, 'month')) && (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div onClick={(e) => isCalendarFullScreen && e.stopPropagation()}>
                <TrainingProvider date={date}>
                    <TrainingCalendarCell compact={!isCalendarFullScreen} />
                    <TrainingPopover />
                </TrainingProvider>
            </div>
        );

    return (
        <Calendar
            className={styles.Calendar}
            dateFullCellRender={(date) => (
                <div
                    className={cn(
                        'ant-picker-cell-inner',
                        'ant-picker-calendar-date',
                        date.isSame(new Date(), 'day') && 'ant-picker-calendar-date-today',
                    )}
                >
                    <div className='ant-picker-calendar-date-value'>
                        {isCalendarFullScreen
                            ? date.local().format('DD')
                            : date.local().format('D')}
                    </div>
                    {!disabled && renderCellContent(date)}
                </div>
            )}
            fullscreen={isCalendarFullScreen}
            onSelect={setSelectedDate}
            value={selectedDate}
        />
    );
};
