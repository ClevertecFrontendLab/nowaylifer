import { Review } from '@redux/reviews';
import { Button } from 'antd';
import cn from 'classnames';
import { memo, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
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
        totalCount={reviews.length}
        itemContent={(idx) => <ListRow review={reviews[reviews.length - 1 - idx]} />}
    />
);

type ReviewsScreenProps = PropsWithReviews & {
    onAddReview: () => void;
};

export const ReviewsScreen = memo(function ReviewsScreen({
    reviews,
    onAddReview,
}: ReviewsScreenProps) {
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
                    type='primary'
                    size='large'
                    onClick={onAddReview}
                    data-test-id='write-review'
                >
                    Написать отзыв
                </Button>
                <Button
                    type='text'
                    size='large'
                    className={styles.ShowAllBtn}
                    onClick={() => setShowAll(!showAll)}
                    data-test-id='all-reviews-button'
                >
                    {showAll ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
                </Button>
            </div>
        </div>
    );
});
