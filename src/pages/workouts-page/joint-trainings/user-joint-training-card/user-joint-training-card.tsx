import Highlighter from 'react-highlight-words';
import { UserOutlined } from '@ant-design/icons';
import { Button } from '@components/button';
import { Card } from '@components/card';
import { UserJointTraining } from '@redux/catalogs';
import { Avatar, Row } from 'antd';
import cn from 'classnames';

import styles from './user-joint-training-card.module.less';

type UserJointTrainingCardProps = {
    user: UserJointTraining;
    searchWords: string[];
    onCreateTraining?(user: UserJointTraining): void;
};

export const UserJointTrainingCard = ({
    user,
    searchWords,
    onCreateTraining,
}: UserJointTrainingCardProps) => (
    <Card className={styles.Card}>
        <Card.Body className={styles.CardBody}>
            <Row className={styles.AvatarContainer}>
                <Avatar
                    icon={<UserOutlined style={{ color: 'var(--character-light-title-85)' }} />}
                    size='large'
                    src={user.imageSrc}
                    style={{ width: 42, height: 42, background: 'var(--theme-gray-3)' }}
                />
                <Highlighter
                    className={cn('ant-typography', styles.UserName)}
                    searchWords={searchWords}
                    textToHighlight={user.name}
                />
            </Row>
            <dl className={styles.Dl}>
                <dt>Тип тренировки</dt>
                <dd>{user.trainingType}</dd>
                <dt>Средняя нагрузка</dt>
                <dd>{user.avgWeightInWeek} кг/нед</dd>
            </dl>
            <Button
                block={true}
                className={styles.Button}
                onClick={() => onCreateTraining?.(user)}
                type='primary'
            >
                Создать тренировку
            </Button>
        </Card.Body>
    </Card>
);
