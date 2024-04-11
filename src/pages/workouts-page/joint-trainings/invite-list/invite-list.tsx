import { useEffect, useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { AppLoader } from '@components/app-loader';
import { Button } from '@components/button';
import { Card } from '@components/card';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    readAllInvites,
    TrainingInviteForMe,
    useSendResponseMutation,
} from '@redux/joint-training';
import { Typography } from 'antd';

import { JointTrainingInvite } from '../joint-training-invite';

import styles from './invite-list.module.less';

type InviteListProps = {
    invites: TrainingInviteForMe[];
    onAccept?(): void;
};

export const InviteList = ({ invites, onAccept }: InviteListProps) => {
    const [expanded, setExpanded] = useState(false);
    const invitesToShow = expanded ? invites : invites.slice(0, 1);
    const [sendResponse, { isLoading }] = useSendResponseMutation();
    const unreadInvites = useAppSelector((state) => state.jointTrainingSlice.unreadInvites);
    const dispatch = useAppDispatch();

    const handleAccept = async (inviteId: string) => {
        try {
            await sendResponse({ id: inviteId, status: 'accepted' }).unwrap();
        } catch {
            // ignore
        }

        onAccept?.();
    };

    const handleReject = (inviteId: string) => {
        sendResponse({ id: inviteId, status: 'rejected' });
    };

    useEffect(
        () => () => {
            dispatch(readAllInvites());
        },
        [dispatch],
    );

    return (
        <Card>
            <AppLoader open={isLoading} />
            <Card.Body className={styles.CardBody}>
                <Typography.Paragraph style={{ marginBottom: 16 }}>
                    {!!unreadInvites && `Новое сообщение (${unreadInvites})`}
                </Typography.Paragraph>
                {invitesToShow.map((invite) => (
                    <JointTrainingInvite
                        key={invite._id}
                        invite={invite}
                        onAccept={() => handleAccept(invite._id)}
                        onReject={() => handleReject(invite._id)}
                        style={{ marginBottom: expanded ? 8 : undefined }}
                    />
                ))}
                {invites.length > 1 && (
                    <Button
                        icon={expanded ? <UpOutlined /> : <DownOutlined />}
                        onClick={() => setExpanded((v) => !v)}
                        type='link'
                    >
                        {expanded ? 'Свернуть все сообщения' : 'Показать все сообщения'}
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
};
