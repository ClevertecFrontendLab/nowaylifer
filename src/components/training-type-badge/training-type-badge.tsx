import { ComponentProps } from 'react';
import { TrainingType } from '@redux/catalogs';
import cn from 'classnames';

import styles from './training-type-badge.module.less';

type TrainingTypeBadgeProps = ComponentProps<'div'> & {
    trainingType: TrainingType;
};

export const TrainingTypeBadge = ({
    trainingType,
    className,
    ...props
}: TrainingTypeBadgeProps) => (
    <div className={cn(styles.Container, className)} {...props}>
        <span className={styles.Circle} style={{ background: trainingType.color }} />
        {trainingType.name}
    </div>
);
