import { useTraining } from '../training-provider';
import { TrainingTypeLabel } from '../training-type-lable';
import styles from './training-calendar-cell.module.less';

export const TrainingCalendarCell = ({ compact = false }: { compact?: boolean }) => {
    const { trainings, trainingTypeMap } = useTraining();

    if (compact && trainings.length) {
        return <div className={styles.HasTraining} />;
    }

    return (
        <div>
            <ul className={styles.TrainingList}>
                {trainings.map((training) => (
                    <li key={training._id}>
                        <TrainingTypeLabel
                            style={{ fontSize: 12, height: 16 }}
                            trainingType={trainingTypeMap[training.name]}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
