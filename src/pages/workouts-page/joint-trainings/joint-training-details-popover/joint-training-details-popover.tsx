import { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Card } from '@components/card';
import { CardNavButton } from '@components/card-nav-button';
import { TrainingTypeBadge } from '@components/training-type-badge';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingPeriods } from '@pages/workouts-page/my-trainings/training-periods';
import { selectTrainingTypeByName, TrainingType } from '@redux/catalogs';
import { Training } from '@redux/training';
import { Popover, PopoverProps, Row } from 'antd';
import invariant from 'invariant';
import moment from 'moment';

import styles from './joint-training-details-popover.module.less';

type CardHeaderProps = {
    trainingType: TrainingType;
    onClose?(): void;
};

const CardHeader = ({ trainingType, onClose }: CardHeaderProps) => (
    <Card.Header className={styles.CardHeader}>
        <TrainingTypeBadge trainingType={trainingType} />
        <CardNavButton
            icon={<CloseOutlined style={{ width: 12, margin: '0 auto' }} />}
            onClick={onClose}
        />
    </Card.Header>
);

type JointTrainingDetailsPopoverProps = PopoverProps & {
    training: Training;
};

export const JointTrainingDetailsPopover = ({
    training,
    open,
    onOpenChange,
    ...rest
}: JointTrainingDetailsPopoverProps) => {
    const trainingType = useAppSelector(selectTrainingTypeByName(training.name));
    const [popoverOpen, setPopoverOpen] = useState(open);

    if (typeof open === 'boolean' && popoverOpen !== open) {
        setPopoverOpen(open);
    }

    const handleOpenChange = (isOpen: boolean) => {
        setPopoverOpen(isOpen);
        onOpenChange?.(isOpen);
    };

    invariant(trainingType, 'TrainingType is undefined');

    return (
        <Popover
            align={{ points: ['tr', 'br'], offset: [0, 1] }}
            content={
                <Card className={styles.Card}>
                    <CardHeader
                        onClose={() => handleOpenChange(false)}
                        trainingType={trainingType}
                    />
                    <Card.Body className={styles.CardBody}>
                        <Row align='middle' style={{ marginBottom: 8 }}>
                            <div style={{ fontWeight: 500, fontSize: 16 }}>
                                {training.parameters?.period &&
                                    trainingPeriods[training.parameters.period].label}
                            </div>
                            <div style={{ marginLeft: 'auto' }}>
                                {moment(training.date).format('DD.MM.YYYY')}
                            </div>
                        </Row>
                        <dl>
                            {training.exercises.map((e) => (
                                <Row justify='space-between' style={{ gap: 8 }} wrap={false}>
                                    <div style={{ color: 'var(--character-light-secondary-45)' }}>
                                        {e.name}
                                    </div>
                                    <div style={{ color: '#2f54eb', fontSize: 12 }}>
                                        {e.approaches} x ({e.weight}кг)
                                    </div>
                                </Row>
                            ))}
                        </dl>
                    </Card.Body>
                </Card>
            }
            data-test-id='joint-training-review-card'
            onOpenChange={handleOpenChange}
            open={popoverOpen}
            overlayClassName={styles.Popover}
            overlayInnerStyle={{ padding: 0 }}
            showArrow={false}
            trigger='click'
            {...rest}
        />
    );
};
