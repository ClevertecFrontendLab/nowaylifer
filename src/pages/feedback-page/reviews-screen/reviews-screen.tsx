import { memo, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { Review } from '@redux/reviews';
import { Button } from 'antd';
import cn from 'classnames';

import { ReviewCard } from '../review-card';

import styles from './reviews-screen.module.less';

type PropsWithReviews = {
    reviews: Review[];
};

const ListRow = memo(({ review }: { review: Review }) => (
    <div className={styles.Row}>
        <ReviewCard review={review} />
    </div>
));

const SimpleList = ({ reviews }: PropsWithReviews) => (
    <div className={styles.ListContainer}>
        {reviews.map((review) => (
            <ListRow key={review.id} review={review} />
        ))}
    </div>
);

const VirtualList = ({ reviews }: PropsWithReviews) => (
    <Virtuoso
        itemContent={(idx) => <ListRow review={reviews[reviews.length - 1 - idx]} />}
        totalCount={reviews.length}
    />
);

type ReviewsScreenProps = PropsWithReviews & {
    onAddReview: () => void;
};

export const ReviewsScreen = memo(({
    reviews,
    onAddReview,
}: ReviewsScreenProps) => {
    const [showAll, setShowAll] = useState(false);
    const visibleReviews = showAll ? reviews : reviews.slice(-4).reverse();
    const List = showAll ? VirtualList : SimpleList;

    return (
        <div className={cn(styles.ScreenWrap, showAll && styles.ShowAll)}>
            <div className={cn(styles.CardListWrap, showAll && styles.ShowAll)}>
                <List reviews={visibleReviews} />
            </div>
            <div className={styles.ButtonsWrap}>
                <Button
                    data-test-id='write-review'
                    onClick={onAddReview}
                    size='large'
                    type='primary'
                >
                    Написать отзыв
                </Button>
                <Button
                    className={styles.ShowAllBtn}
                    data-test-id='all-reviews-button'
                    onClick={() => setShowAll(!showAll)}
                    size='large'
                    type='text'
                >
                    {showAll ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
                </Button>
            </div>
        </div>
    );
});
