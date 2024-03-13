import { useXs } from '@hooks/use-breakpoint';
import { TrainingType } from '@redux/catalogs';
import { Training } from '@redux/training';
import { Calendar as CalendarAntd } from 'antd';
import moment from 'moment';
import 'moment/locale/ru';
import { useState } from 'react';
import { TrainingPopover } from '../training/training-popover';
import styles from './calendar.module.less';
import ruRu from './ru-Ru';

moment.locale('ru', {
    week: {
        dow: 1,
    },
});

type CalendarProps = {
    trainingList: Training[];
    trainingTypes: TrainingType[];
};

export const Calendar = ({ trainingTypes, trainingList }: CalendarProps) => {
    const [selectedDate, setSelectedDate] = useState(moment);
    const xs = useXs();
    const isCalendarFullScreen = !xs;
    console.log(trainingTypes, trainingList);

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
                        <TrainingPopover trainingTypes={trainingTypes} date={date} />
                    </div>
                )
            }
        />
    );
};
