import { TrainingCatalogItem } from '@redux/catalogs';
import { Training } from '@redux/training';
import { Calendar as CalendarAntd } from 'antd';
import moment from 'moment';
import 'moment/locale/ru';
import ruRu from './ru-Ru';
import styles from './calendar.module.less';
import { useXs } from '@hooks/use-breakpoint';

moment.locale('ru', {
    week: {
        dow: 1,
    },
});

type CalendarProps = {
    trainingList: Training[];
    trainingCatalog: TrainingCatalogItem[];
};

export const Calendar = ({ trainingCatalog, trainingList }: CalendarProps) => {
    console.log(trainingCatalog, trainingList);
    const xs = useXs();
    return <CalendarAntd locale={ruRu} className={styles.Calendar} fullscreen={!xs} />;
};
