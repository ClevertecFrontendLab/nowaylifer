import { useMediaQuery } from 'react-responsive';
import { TrainingPal } from '@redux/catalogs';
import { List } from 'antd';

import { SearchPalCard } from '../search-pal-card';

import styles from './search-pal-list.module.less';

type SearchPalListProps = {
    onCreateTraining?(user: TrainingPal): void;
    users: TrainingPal[];
    searchWords: string[];
};

export const SearchPalList = ({ users, searchWords, onCreateTraining }: SearchPalListProps) => {
    const laptop = useMediaQuery({ maxWidth: 894 });

    return (
        <List
            className={styles.List}
            dataSource={users}
            grid={{ gutter: laptop ? 12 : 16 }}
            pagination={{
                position: 'bottom',
                size: 'small',
                showSizeChanger: false,
                style: { textAlign: 'left' },
                pageSize: laptop ? 8 : 15,
            }}
            renderItem={(user) => (
                <List.Item style={{ marginBottom: laptop ? 12 : 16 }}>
                    <SearchPalCard
                        onCreateTraining={onCreateTraining}
                        searchWords={searchWords}
                        user={user}
                    />
                </List.Item>
            )}
        />
    );
};
