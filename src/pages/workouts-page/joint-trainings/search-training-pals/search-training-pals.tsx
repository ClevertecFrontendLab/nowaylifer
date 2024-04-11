import { Fragment, useDeferredValue, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { AppLoader } from '@components/app-loader';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    selectMostPopularTrainingType,
    TrainingPal,
    useFetchUserJointTrainingListQuery,
} from '@redux/catalogs';
import { Button, Input, Row } from 'antd';

import { JointTrainingDrawer } from '../joint-training-drawer';

import { SearchPalList } from './search-pal-list';
import styles from './search-training-pals.module.less';

export type SearchTrainingPalsProps = {
    type: 'random' | 'mostPopular';
    onGoBack?(): void;
};

export const SearchTrainingPals = ({ type, onGoBack }: SearchTrainingPalsProps) => {
    const mostPopularTrainingType = useAppSelector(selectMostPopularTrainingType);
    const { data: users, isFetching } = useFetchUserJointTrainingListQuery(
        type === 'mostPopular' ? mostPopularTrainingType : undefined,
    );

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [partner, setPartner] = useState<TrainingPal>();

    const filteredUsers = useDeferredValue(
        users?.filter((user) => user.name.includes(searchQuery)),
    );

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleDrawerOpen = (user: TrainingPal) => {
        setPartner(user);
        setDrawerOpen(true);
    };

    return (
        <Fragment>
            <AppLoader open={isFetching} />
            <JointTrainingDrawer
                onClose={() => setDrawerOpen(false)}
                open={drawerOpen}
                partner={partner}
            />
            <Row className={styles.SearchContainer}>
                <Button
                    className={styles.BackButton}
                    icon={<ArrowLeftOutlined style={{ fontSize: 'var(--font-size-sm)' }} />}
                    onClick={onGoBack}
                    type='text'
                >
                    Назад
                </Button>
                <Input.Search
                    className={styles.InputSearch}
                    data-test-id='search-input'
                    onChange={(e) => handleSearch(e.currentTarget.value)}
                />
            </Row>
            {filteredUsers && (
                <SearchPalList
                    onCreateTraining={handleDrawerOpen}
                    searchWords={[searchQuery]}
                    users={filteredUsers}
                />
            )}
        </Fragment>
    );
};
