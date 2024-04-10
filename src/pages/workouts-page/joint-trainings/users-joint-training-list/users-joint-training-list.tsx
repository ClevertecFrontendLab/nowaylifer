import { useMediaQuery } from 'react-responsive';
import { UserJointTraining } from '@redux/catalogs';
import { List } from 'antd';

import { UserJointTrainingCard } from '../user-joint-training-card';

import styles from './users-joint-training-list.module.less';

type UsersJointTrainingListProps = {
    onCreateTraining?(user: UserJointTraining): void;
    users: UserJointTraining[];
    searchWords: string[];
};

export const UsersJointTrainingList = ({
    users,
    searchWords,
    onCreateTraining,
}: UsersJointTrainingListProps) => {
    const laptop = useMediaQuery({ maxWidth: 894 });

    return (
        <List
            className={styles.List}
            dataSource={users}
            grid={{ gutter: laptop ? 12 : 16 }}
            pagination={{
                position: 'bottom',
                size: 'small',
                style: { textAlign: 'left' },
                pageSize: laptop ? 8 : 15,
            }}
            renderItem={(user) => (
                <List.Item style={{ marginBottom: laptop ? 12 : 16 }}>
                    <UserJointTrainingCard
                        searchWords={searchWords}
                        user={user}
                        onCreateTraining={onCreateTraining}
                    />
                </List.Item>
            )}
        />
    );
};
