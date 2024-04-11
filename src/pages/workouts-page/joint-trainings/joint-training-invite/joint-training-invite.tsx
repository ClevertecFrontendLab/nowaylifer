import { CSSProperties } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button } from '@components/button';
import { Card } from '@components/card';
import { TrainingInviteForMe } from '@redux/joint-training';
import { Avatar, Typography } from 'antd';
import cn from 'classnames';
import moment from 'moment';

import { JointTrainingDetailsPopover } from '../joint-training-details-popover';

import styles from './joint-training-invite.module.less';

type JointTrainingInviteProps = {
    invite: TrainingInviteForMe;
    className?: string;
    style?: CSSProperties;
    onAccept?(): void;
    onReject?(): void;
};

export const JointTrainingInvite = ({
    invite,
    className,
    onAccept,
    onReject,
    ...rest
}: JointTrainingInviteProps) => {
    const user = invite.from;

    return (
        <Card className={cn(styles.Card, className)} {...rest}>
            <Card.Body className={styles.CardBody}>
                <div className={styles.AvatarContainer}>
                    <Avatar icon={<UserOutlined />} size={42} src={user.imageSrc} />
                    <Typography.Text>{user.firstName}</Typography.Text>
                </div>
                <div>
                    <time className={styles.Date}>
                        {moment(invite.createdAt).format('DD.MM.YYYY')}
                    </time>
                    <Typography.Paragraph className={styles.Message}>
                        Привет, я ищу партнёра для совместных [{invite.training.name} тренировок].
                        Ты хочешь присоединиться ко мне на следующих тренировках?
                    </Typography.Paragraph>
                    <JointTrainingDetailsPopover training={invite.training}>
                        <Button className={styles.SeeDetailsBtn} type='link'>
                            Посмотреть детали тренировки
                        </Button>
                    </JointTrainingDetailsPopover>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 16,
                        columnGap: 16,
                        rowGap: 12,
                    }}
                >
                    <Button onClick={() => onAccept?.()} size='large' type='primary'>
                        Тренироваться вместе
                    </Button>
                    <Button onClick={() => onReject?.()} size='large'>
                        Отклонить запрос
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};
