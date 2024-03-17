import { useXs } from '@hooks/use-breakpoint';
import { Calendar as CalendarAntd } from 'antd';
import moment from 'moment';
import 'moment/locale/ru';
import { useState } from 'react';
import { TrainingPopover } from '../training/training-popover';
import { TrainingProvider } from '../training/training-provider';
import styles from './calendar.module.less';
import ruRu from './ru-Ru';

moment.locale('ru', {
    week: {
        dow: 1,
    },
});

export const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(moment);
    const xs = useXs();
    const isCalendarFullScreen = !xs;

    return (
        <CalendarAntd
            locale={ruRu}
            value={selectedDate}
            onSelect={setSelectedDate}
            className={styles.Calendar}
            fullscreen={isCalendarFullScreen}
            dateCellRender={(date) =>
                (isCalendarFullScreen || date.isSame(selectedDate, 'month')) && (
                    <div onClick={(e) => isCalendarFullScreen && e.stopPropagation()}>
                        <TrainingProvider date={date}>
                            <TrainingPopover />
                        </TrainingProvider>
                    </div>
                )
            }
        />
    );
};
