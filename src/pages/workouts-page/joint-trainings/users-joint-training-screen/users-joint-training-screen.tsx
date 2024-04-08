import { Fragment, useDeferredValue, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { UserJointTraining } from '@redux/catalogs';
import { Button, Input, Row } from 'antd';

import { UsersJointTrainingList } from '../users-joint-training-list';

import styles from './users-joint-training-screen.module.less';

export const UsersJointTrainingScreen = ({ users }: { users: UserJointTraining[] }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredUsers = useDeferredValue(users.filter((user) => user.name.includes(searchQuery)));

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <Fragment>
            <Row className={styles.SearchContainer}>
                <Button
                    className={styles.BackButton}
                    icon={<ArrowLeftOutlined style={{ fontSize: 'var(--font-size-sm)' }} />}
                    type='text'
                >
                    Назад
                </Button>
                <Input.Search
                    className={styles.InputSearch}
                    onChange={(e) => handleSearch(e.currentTarget.value)}
                />
            </Row>
            <UsersJointTrainingList searchWords={[searchQuery]} users={filteredUsers} />
        </Fragment>
    );
};
