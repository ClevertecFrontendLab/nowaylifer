import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Card } from '@components/card';
import { TrainingTypeMap } from '@redux/catalogs';
import { Training } from '@redux/training';
import { Button, Typography } from 'antd';
import { Moment } from 'moment';

import { EmptyPlaceholder } from '../empty-placeholder';
import { useTraining } from '../training-provider';
import { TrainingTypeBadge } from '../training-type-badge';

import styles from './training-card.module.less';

type TrainingCardHeaderProps = {
    date: Moment;
    onClose?(): void;
};

const TrainingCardHeader = ({ date, onClose }: TrainingCardHeaderProps) => (
    <Card.Header className={styles.TrainingCardHeader}>
        <Typography.Text className={styles.TrainingCardTitle}>
            Тренировки на {date.local().format('DD.MM.YYYY')}
        </Typography.Text>
        <Button
            className={styles.CloseButton}
            data-test-id='modal-create-training-button-close'
            icon={<CloseOutlined style={{ width: 12, margin: '0 auto' }} />}
            onClick={onClose}
        />
    </Card.Header>
);

const NoTraining = () => (
    <Card.Body style={{ marginTop: 4 }}>
        <Typography.Paragraph style={{ marginBottom: 16 }} type='secondary'>
            Нет активных тренировок
        </Typography.Paragraph>
        <EmptyPlaceholder />
    </Card.Body>
);

type TrainingListProps = {
    trainings: Training[];
    trainingTypeMap: TrainingTypeMap;
    onEditTraining?(training: Training): void;
    visible: boolean;
};

const TrainingList = ({
    visible,
    trainings,
    trainingTypeMap,
    onEditTraining,
}: TrainingListProps) => (
    <Card.Body style={{ paddingTop: 16, paddingInline: 0 }}>
        <ul className={styles.TrainingList}>
            {trainings.map((training, idx) => {
                const style =
                    'isImplementation' in training && training.isImplementation
                        ? { color: 'var(--character-light-secondary-45)' }
                        : undefined;

                return (
                    <li key={training._id} className={styles.TrainingListItem} style={style}>
                        <TrainingTypeBadge trainingType={trainingTypeMap[training.name]} />
                        <Button
                            data-test-id={
                                visible ? `modal-update-training-edit-button${idx}` : undefined
                            }
                            disabled={training.isImplementation}
                            icon={<EditOutlined style={{ width: 18, height: 18 }} />}
                            onClick={() => onEditTraining?.(training)}
                            style={{ height: 22 }}
                            type='link'
                        />
                    </li>
                );
            })}
        </ul>
    </Card.Body>
);

export type TrainingCardProps = {
    visible: boolean;
    onClose?(): void;
    onCreateTraining?(): void;
    onEditTraining?(training: Training): void;
    createDisabled?: boolean;
};

export const TrainingCard = ({
    onClose,
    visible,
    createDisabled,
    onEditTraining,
    onCreateTraining,
}: TrainingCardProps) => {
    const { trainings, date, trainingTypeMap } = useTraining();

    return (
        <Card className={styles.TrainingCard} data-test-id='modal-create-training'>
            <TrainingCardHeader date={date} onClose={onClose} />
            {trainings.length ? (
                <TrainingList
                    onEditTraining={onEditTraining}
                    trainingTypeMap={trainingTypeMap}
                    trainings={trainings}
                    visible={visible}
                />
            ) : (
                <NoTraining />
            )}
            <Card.Footer>
                <Button
                    block={true}
                    disabled={createDisabled}
                    onClick={onCreateTraining}
                    size='large'
                    style={{ fontSize: 14 }}
                    type='primary'
                >
                    Создать тренировку
                </Button>
            </Card.Footer>
        </Card>
    );
};
