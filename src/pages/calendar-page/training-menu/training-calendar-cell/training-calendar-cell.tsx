import { TrainingTypeBadge } from '@components/training-type-badge';

import { useTraining } from '../training-provider';

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
                        <TrainingTypeBadge
                            style={{ fontSize: 'var(--font-size-xs)', height: 16 }}
                            trainingType={trainingTypeMap[training.name]}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
