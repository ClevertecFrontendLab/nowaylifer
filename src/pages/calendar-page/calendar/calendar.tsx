import { TrainingCatalogItem } from '@redux/catalogs';
import { Training } from '@redux/training';
import { Calendar as CalendarAntd } from 'antd';

type CalendarProps = {
    trainingList: Training[];
    trainingCatalog: TrainingCatalogItem[];
};

export const Calendar = ({ trainingCatalog, trainingList }: CalendarProps) => {
    console.log(trainingCatalog, trainingList);
    return <CalendarAntd />;
};
