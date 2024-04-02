import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectTrainingsByDate } from '@redux/training';
import cn from 'classnames';
import { Moment } from 'moment';

import styles from './training-drawer.module.less';

export const DatePickerCell = ({ date }: { date: Moment }) => {
    const hasTrainings = Boolean(useAppSelector(selectTrainingsByDate(date)).length);

    return (
        <div
            className={cn(
                'ant-picker-cell-inner',
                styles.DatePickerCell,
                hasTrainings && styles.HasTraining,
            )}
        >
            {date.format('D')}
        </div>
    );
};
