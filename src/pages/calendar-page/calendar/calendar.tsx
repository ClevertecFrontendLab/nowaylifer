import { useXs } from '@hooks/use-breakpoint';
import { Calendar as CalendarAntd } from 'antd';
import moment, { Moment } from 'moment';
import 'moment/locale/ru';
import { useState } from 'react';
import { TrainingPopover } from '../training/training-popover';
import { TrainingProvider } from '../training/training-provider';
import styles from './calendar.module.less';
import ruRu from './ru-Ru';
import { TrainingCalendarCell } from '../training/training-calendar-cell';
import cn from 'classnames';

moment.locale('ru', {
    week: {
        dow: 1,
    },
});

export const Calendar = () => {
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
        <CalendarAntd
            locale={ruRu}
            value={selectedDate}
            onSelect={setSelectedDate}
            className={styles.Calendar}
            fullscreen={isCalendarFullScreen}
            dateCellRender={isCalendarFullScreen ? renderCellContent : undefined}
            {...(!isCalendarFullScreen && {
                dateFullCellRender: (date) => (
                    <div
                        className={cn(
                            'ant-picker-cell-inner',
                            'ant-picker-calendar-date',
                            date.isSame(new Date(), 'day') && 'ant-picker-calendar-date-today',
                        )}
                    >
                        <div className='ant-picker-calendar-date-value'>{date.date()}</div>
                        {renderCellContent(date)}
                    </div>
                ),
            })}
        />
    );
};
