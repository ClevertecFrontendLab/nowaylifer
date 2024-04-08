import { Fragment, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { UserJointTraining } from '@redux/catalogs';
import { Button, Input, Row } from 'antd';

import { UsersJointTrainingList } from '../users-joint-training-list';

import styles from './users-joint-training-screen.module.less';

export const UsersJointTrainingScreen = ({ users }: { users: UserJointTraining[] }) => {
    const [searchQuery, setSearchQuery] = useState<string>();

    const filteredUsers = searchQuery;

    return (
        <Fragment>
            <Row className={styles.SearchContainer}>
                <Button
                    className={styles.BackButton}
                    icon={<ArrowLeftOutlined style={{ fontSize: 14 }} />}
                    type='text'
                >
                    Назад
                </Button>
                <Input.Search className={styles.InputSearch} />
            </Row>
            <UsersJointTrainingList users={users} />
        </Fragment>
    );
};
