import { Fragment, useDeferredValue, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectTrainingTypes, UserJointTraining } from '@redux/catalogs';
import { Button, Input, Row } from 'antd';

import { JointTrainingDrawer } from '../joint-trainings-drawer';
import { UsersJointTrainingList } from '../users-joint-training-list';

import styles from './users-joint-training-screen.module.less';

export const UsersJointTrainingScreen = ({ users }: { users: UserJointTraining[] }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [partner, setPartner] = useState<UserJointTraining>();
    const trainingTypes = useAppSelector(selectTrainingTypes);

    const filteredUsers = useDeferredValue(users.filter((user) => user.name.includes(searchQuery)));

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleDrawerOpen = (user: UserJointTraining) => {
        console.log(user);
        setPartner(user);
        setDrawerOpen(true);
    };

    return (
        <Fragment>
            <JointTrainingDrawer
                mode='create'
                onClose={() => setDrawerOpen(false)}
                open={drawerOpen}
                partner={partner}
                trainingTypes={trainingTypes}
            />
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
            <UsersJointTrainingList
                onCreateTraining={handleDrawerOpen}
                searchWords={[searchQuery]}
                users={filteredUsers}
            />
        </Fragment>
    );
};
