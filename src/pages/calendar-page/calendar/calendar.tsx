import { useXs } from '@hooks/use-breakpoint';
import { Calendar } from 'antd';
import cn from 'classnames';
import moment, { Moment } from 'moment';
import 'moment/locale/ru';
import { useState } from 'react';
import { TrainingCalendarCell } from '../training-menu/training-calendar-cell';
import { TrainingPopover } from '../training-menu/training-popover';
import { TrainingProvider } from '../training-menu/training-provider';
import styles from './calendar.module.less';
import ruRu from './ru-Ru';

moment.locale('ru', {
    week: {
        dow: 1,
    },
});

export const TrainingCalendar = () => {
    const [selectedDate, setSelectedDate] = useState<Moment | undefined>(moment);
    const xs = useXs();
    const isCalendarFullScreen = !xs;

    const renderCellContent = (date: Moment) =>
        (isCalendarFullScreen || date.isSame(selectedDate, 'month')) && (
            <div onClick={(e) => isCalendarFullScreen && e.stopPropagation()}>
                <TrainingProvider date={date}>
                    <TrainingCalendarCell compact={!isCalendarFullScreen} />
                    <TrainingPopover />
                </TrainingProvider>
            </div>
        );

    return (
        <Calendar
            locale={ruRu}
            value={selectedDate}
            onSelect={setSelectedDate}
            className={styles.Calendar}
            fullscreen={isCalendarFullScreen}
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
                    {renderCellContent(date)}
                </div>
            )}
        />
    );
};
