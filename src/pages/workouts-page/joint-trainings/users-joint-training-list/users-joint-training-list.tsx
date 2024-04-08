import { useMediaQuery } from 'react-responsive';
import { UserJointTraining } from '@redux/catalogs';
import { List } from 'antd';

import { UserJointTrainingCard } from '../user-joint-training-card';

import styles from './users-joint-training-list.module.less';

type UsersJointTrainingListProps = {
    users: UserJointTraining[];
    searchWords: string[];
};

export const UsersJointTrainingList = ({ users, searchWords }: UsersJointTrainingListProps) => {
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
                    <UserJointTrainingCard searchWords={searchWords} user={user} />
                </List.Item>
            )}
        />
    );
};
