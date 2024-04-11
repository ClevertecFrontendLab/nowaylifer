import { Fragment, ReactNode } from 'react';
import Highlighter from 'react-highlight-words';
import { CheckCircleFilled, ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from '@components/button';
import { Card } from '@components/card';
import { TrainingPal } from '@redux/catalogs';
import { Avatar, Row } from 'antd';
import cn from 'classnames';

import styles from './search-pal-card.module.less';

const statusMap: Record<
    NonNullable<TrainingPal['status']>,
    { text: ReactNode; icon?: ReactNode }
> = {
    accepted: {
        text: 'тренировка одобрена',
        icon: <CheckCircleFilled style={{ color: 'var(--ant-success-color)' }} />,
    },
    rejected: {
        text: 'тренировка отклонена',
        icon: (
            <ExclamationCircleOutlined style={{ color: 'var(--character-light-secondary-45)' }} />
        ),
    },
    pending: { text: 'ожидает подтверждения' },
};

const Status = ({ status }: { status: TrainingPal['status'] }) => {
    let content = null;

    if (status) {
        const r = statusMap[status];

        content = (
            <Fragment>
                {r.text}
                <span style={{ marginLeft: r.icon ? 9 : undefined }}>{r.icon}</span>
            </Fragment>
        );
    }

    return <div style={{ textAlign: 'center' }}>{content}</div>;
};

type SearchPalCardProps = {
    user: TrainingPal;
    searchWords: string[];
    onCreateTraining?(user: TrainingPal): void;
};

export const SearchPalCard = ({ user, searchWords, onCreateTraining }: SearchPalCardProps) => (
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
            <Status status={user.status} />
        </Card.Body>
    </Card>
);
