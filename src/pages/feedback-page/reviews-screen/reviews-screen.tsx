import { Review } from '@redux/reviews';
import { Button } from 'antd';
import cn from 'classnames';
import { useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { ReviewCard } from '../review-card';
import styles from './reviews-screen.module.less';

const MAX_REVIEWS = 4;

type PropsWithReviews = {
    reviews: Review[];
};

const ListRow = ({ review }: { review: Review }) => (
    <div className={styles.Row}>
        <ReviewCard review={review} />
    </div>
);

const SimpleList = ({ reviews }: PropsWithReviews) => (
    <div className={styles.ListContainer}>
        {reviews.map((review) => (
            <ListRow key={review.id} review={review} />
        ))}
    </div>
);

const VirtualList = ({ reviews }: PropsWithReviews) => (
    <Virtuoso data={reviews} itemContent={(_, review) => <ListRow review={review} />} />
);

export const ReviewsScreen = ({ reviews }: PropsWithReviews) => {
    const [showAll, setShowAll] = useState(false);
    const visibleReviews = showAll ? reviews : reviews.slice(0, MAX_REVIEWS);
    const List = showAll ? VirtualList : SimpleList;

    return (
        <div className={cn(styles.ScreenWrap, showAll && styles.ShowAll)}>
            <div className={cn(styles.CardListWrap, showAll && styles.ShowAll)}>
                <List reviews={visibleReviews} />
            </div>
            <div className={styles.ButtonsWrap}>
                <Button type='primary' size='large'>
                    Написать отзыв
                </Button>
                <Button
                    type='text'
                    size='large'
                    className={styles.ShowAllBtn}
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
                </Button>
            </div>
        </div>
    );
};
