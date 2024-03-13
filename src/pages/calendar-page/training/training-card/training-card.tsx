import { CloseOutlined } from '@ant-design/icons';
import { Card } from '@components/card';
import { Button, Typography } from 'antd';
import cn from 'classnames';
import { Moment } from 'moment';
import { EmptyPlaceholder } from '../empty-placeholder';
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

const NoTrainingCardBody = () => (
    <Card.Body style={{ marginTop: 4 }}>
        <Typography.Paragraph type='secondary' style={{ marginBottom: 16 }}>
            Нет активных тренировок
        </Typography.Paragraph>
        <EmptyPlaceholder />
    </Card.Body>
);

export type TrainingCardProps = TrainingCardHeaderProps & {
    onCreateTraining?(): void;
};

export const TrainingCard = ({ onCreateTraining, date, onClose }: TrainingCardProps) => {
    return (
        <Card className={styles.TrainingCard}>
            <TrainingCardHeader date={date} onClose={onClose} />
            <NoTrainingCardBody />
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
};
