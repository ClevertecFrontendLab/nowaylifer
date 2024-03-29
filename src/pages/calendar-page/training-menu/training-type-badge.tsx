import { ComponentProps } from 'react';
import { TrainingType } from '@redux/catalogs';

const wrapperStyle = {
    gap: 'var(--space-2)',
    fontSize: 'var(--font-size-sm)',
    display: 'flex',
    alignItems: 'center',
};

type TrainingTypeBadgeProps = ComponentProps<'div'> & {
    trainingType: TrainingType;
};

export const TrainingTypeBadge = ({ trainingType, style, ...props }: TrainingTypeBadgeProps) => (
    <div style={{ ...wrapperStyle, ...style }} {...props}>
        <span
            style={{
                borderRadius: '50%',
                width: 6,
                height: 6,
                background: trainingType.color,
            }}
        />
        {trainingType.name}
    </div>
);
