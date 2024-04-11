import { UserOutlined } from '@ant-design/icons';
import { Card } from '@components/card';
import { TrainingPal } from '@redux/catalogs';
import { Avatar, Row, Typography } from 'antd';

import styles from './my-training-pal-card.module.less';

type MyTrainingPalCardProps = {
    pal: TrainingPal;
    onClick?(): void;
};

export const MyTrainingPalCard = ({ pal, onClick }: MyTrainingPalCardProps) => (
    <Card className={styles.Card} onClick={onClick}>
        <Card.Body className={styles.CardBody}>
            <Row className={styles.AvatarContainer}>
                <Avatar
                    icon={<UserOutlined style={{ color: 'var(--character-light-title-85)' }} />}
                    size='large'
                    src={pal.imageSrc}
                    style={{ width: 42, height: 42, background: 'var(--theme-gray-3)' }}
                />
                <Typography.Paragraph className={styles.UserName}>{pal.name}</Typography.Paragraph>
            </Row>
            <dl className={styles.Dl}>
                <dt>Тип тренировки</dt>
                <dd>{pal.trainingType}</dd>
                <dt>Средняя нагрузка</dt>
                <dd>{pal.avgWeightInWeek} кг/нед</dd>
            </dl>
        </Card.Body>
    </Card>
);
