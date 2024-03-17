import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Card } from '@components/card';
import { TrainingTypeMap } from '@redux/catalogs';
import { Training } from '@redux/training';
import { Button, Typography } from 'antd';
import cn from 'classnames';
import { Moment } from 'moment';
import { EmptyPlaceholder } from '../empty-placeholder';
import { TrainingTypeLabel } from '../training-type-lable';
import styles from './training-card.module.less';
import { useTraining } from '../training-provider';

type TrainingCardHeaderProps = {
    date: Moment;
    onClose?(): void;
};

const TrainingCardHeader = ({ date, onClose }: TrainingCardHeaderProps) => (
    <Card.Header className={styles.TrainingCardHeader}>
        <Typography.Text className={styles.TrainingCardTitle}>
            Тренировки на {date.format('DD.MM.YYYY')}
        </Typography.Text>
        <Button
            onClick={onClose}
            className={cn(styles.CloseButton)}
            icon={<CloseOutlined style={{ width: 12, margin: '0 auto' }} />}
        />
    </Card.Header>
);

const NoTraining = () => (
    <Card.Body style={{ marginTop: 4 }}>
        <Typography.Paragraph type='secondary' style={{ marginBottom: 16 }}>
            Нет активных тренировок
        </Typography.Paragraph>
        <EmptyPlaceholder />
    </Card.Body>
);

type TrainingListProps = {
    trainings: Training[];
    trainingTypeMap: TrainingTypeMap;
    onEditTraining?(training: Training): void;
};

const TrainingList = ({ trainings, trainingTypeMap, onEditTraining }: TrainingListProps) => (
    <Card.Body style={{ paddingTop: 16, paddingInline: 0 }}>
        <ul className={styles.TrainingList}>
            {trainings.map((training) => {
                const style =
                    'isImplementation' in training && training.isImplementation
                        ? { color: 'var(--character-light-secondary-45)' }
                        : undefined;

                return (
                    <li key={training._id} className={styles.TrainingListItem} style={style}>
                        <TrainingTypeLabel trainingType={trainingTypeMap[training.name]} />
                        <Button
                            type='link'
                            style={{ height: 22, ...style }}
                            onClick={() => onEditTraining?.(training)}
                            icon={<EditOutlined style={{ width: 18, height: 18 }} />}
                        />
                    </li>
                );
            })}
        </ul>
    </Card.Body>
);

export type TrainingCardProps = {
    onClose?(): void;
    onCreateTraining?(): void;
    onEditTraining?(training: Training): void;
    createDisabled?: boolean;
};

export const TrainingCard = ({
    onClose,
    onEditTraining,
    onCreateTraining,
    createDisabled,
}: TrainingCardProps) => {
    const { trainings, date, trainingTypeMap } = useTraining();

    return (
        <Card className={styles.TrainingCard}>
            <TrainingCardHeader date={date} onClose={onClose} />
            {trainings.length ? (
                <TrainingList
                    trainings={trainings}
                    onEditTraining={onEditTraining}
                    trainingTypeMap={trainingTypeMap}
                />
            ) : (
                <NoTraining />
            )}
            <Card.Footer>
                <Button
                    block
                    size='large'
                    type='primary'
                    style={{ fontSize: 14 }}
                    disabled={createDisabled}
                    onClick={onCreateTraining}
                >
                    {trainings.length ? 'Добавить тренировку' : 'Создать тренировку'}
                </Button>
            </Card.Footer>
        </Card>
    );
};
