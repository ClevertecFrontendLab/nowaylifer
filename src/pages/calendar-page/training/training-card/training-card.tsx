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

type TrainingCardHeaderProps = {
    onClose?(): void;
    date: Moment;
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
};

const TrainingList = ({ trainings, trainingTypeMap }: TrainingListProps) => (
    <Card.Body>
        <ul style={{ display: 'flex', flexDirection: 'column' }}>
            {trainings.map((tr) => (
                <li key={tr._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TrainingTypeLabel trainingType={trainingTypeMap[tr.name]} />
                    <Button icon={<EditOutlined style={{ width: 14 }} />} />
                </li>
            ))}
        </ul>
    </Card.Body>
);

export type TrainingCardProps = TrainingCardHeaderProps &
    TrainingListProps & {
        onCreateTraining?(): void;
    };

export const TrainingCard = ({
    date,
    onClose,
    trainings,
    trainingTypeMap,
    onCreateTraining,
}: TrainingCardProps) => (
    <Card className={styles.TrainingCard}>
        <TrainingCardHeader date={date} onClose={onClose} />
        {trainings.length ? (
            <TrainingList trainings={trainings} trainingTypeMap={trainingTypeMap} />
        ) : (
            <NoTraining />
        )}
        <Card.Footer>
            <Button
                type='primary'
                size='large'
                block
                style={{ fontSize: 14 }}
                onClick={onCreateTraining}
            >
                Создать тренировку
            </Button>
        </Card.Footer>
    </Card>
);
