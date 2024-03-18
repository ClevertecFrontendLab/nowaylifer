import { TrainingType } from '@redux/catalogs';
import { ComponentProps } from 'react';

const wrapperStyle = {
    gap: 8,
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
};

type TrainingTypeBadgeProps = ComponentProps<'div'> & {
    trainingType: TrainingType;
};

export const TrainingTypeBadge = ({ trainingType, style, ...props }: TrainingTypeBadgeProps) => {
    return (
        <div style={{ ...wrapperStyle, ...style }} {...props}>
            <span
                style={{ borderRadius: '50%', width: 6, height: 6, background: trainingType.color }}
            ></span>
            {trainingType.name}
        </div>
    );
};
