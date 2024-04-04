import { useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from '@components/button';
import { Card } from '@components/card';
import { CardNavButton } from '@components/card-nav-button';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useXss } from '@hooks/use-breakpoint';
import { selectTrainingTypeByName } from '@redux/catalogs';
import { Training } from '@redux/training';
import { Popover, PopoverProps, Typography } from 'antd';
import cn from 'classnames';

import styles from './training-popover.module.less';

type TrainingPopoverProps = PopoverProps & {
    training: Training;
    onAddExercise?(): void;
};

export const TrainingPopover = ({
    open,
    training,
    onOpenChange,
    onAddExercise,
    overlayClassName,
    ...props
}: TrainingPopoverProps) => {
    const [popoverOpen, setPopoverOpen] = useState(open);
    const trainingType = useAppSelector(selectTrainingTypeByName(training.name));
    const xss = useXss();

    if (typeof open === 'boolean' && popoverOpen !== open) {
        setPopoverOpen(open);
    }

    const handleOpenChange = (isOpen: boolean) => {
        setPopoverOpen(isOpen);
        onOpenChange?.(isOpen);
    };

    return (
        <Popover
            align={{ points: ['tr', 'br'], offset: [0, 1] }}
            content={
                <Card className={styles.Card}>
                    <Card.Header
                        className={styles.CardHeader}
                        style={{ borderColor: trainingType?.color }}
                    >
                        <CardNavButton
                            icon={<ArrowLeftOutlined style={{ fontSize: 16 }} />}
                            onClick={() => handleOpenChange(false)}
                        />
                        <Typography.Text>{training.name}</Typography.Text>
                    </Card.Header>
                    <Card.Body className={styles.CardBody}>
                        <ul className={styles.ExerciseList}>
                            {training.exercises.map((exercise) => (
                                <li key={exercise._id}>
                                    <Typography.Text
                                        style={{ color: 'var(--character-light-secondary-45)' }}
                                        type='secondary'
                                    >
                                        {exercise.name}
                                    </Typography.Text>
                                </li>
                            ))}
                        </ul>
                    </Card.Body>
                    <Card.Footer>
                        <Button
                            block={true}
                            disabled={training.isImplementation}
                            onClick={onAddExercise}
                        >
                            Добавить упражнения
                        </Button>
                    </Card.Footer>
                </Card>
            }
            destroyTooltipOnHide={true}
            getPopupContainer={(triggerNode) => triggerNode}
            onOpenChange={handleOpenChange}
            open={popoverOpen}
            overlayClassName={cn(styles.TrainingPopover, xss && styles.ModalMode, overlayClassName)}
            showArrow={false}
            trigger='click'
            {...props}
        />
    );
};
