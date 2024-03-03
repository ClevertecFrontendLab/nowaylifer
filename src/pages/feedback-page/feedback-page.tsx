import { Breadcrumbs } from '@components/breadcrumbs';
import { LoaderModal } from '@components/loader-modal';
import { PageContent } from '@components/page-content';
import { PageHeader } from '@components/page-header';
import { PageLayout } from '@components/page-layout';
import { CreateReviewDTO, useAddReviewMutation, useFetchAllReviewsQuery } from '@redux/reviews';
import { useCallback, useEffect, useState } from 'react';
import { AddReviewModal } from './add-review-modal';
import styles from './feedback-page.module.less';
import { NoReviewsScreen } from './no-reviews-screen/no-reviews-screen';
import { ReviewsScreen } from './reviews-screen';

export const FeedbackPage = () => {
    const {
        data: reviews,
        isSuccess,
        isFetching,
    } = useFetchAllReviewsQuery(undefined, { refetchOnMountOrArgChange: true });
    const [addReveiw, { isLoading: isAddReviewLoading }] = useAddReviewMutation();
    const [showAddReviewModal, setShowAddReviewModal] = useState(false);

    const openAddReviewModal = useCallback(() => {
        setShowAddReviewModal(true);
    }, []);

    const closeAddReviewModal = () => {
        setShowAddReviewModal(false);
    };

    const handleSubmitReveiw = async (dto: CreateReviewDTO) => {
        addReveiw(dto);
    };

    useEffect(() => {
        if (isSuccess && !isFetching) {
            closeAddReviewModal();
        }
    }, [isSuccess, isFetching]);

    return (
        <PageLayout>
            <LoaderModal open={isFetching || isAddReviewLoading} />
            <AddReviewModal
                open={showAddReviewModal}
                onCancel={closeAddReviewModal}
                onSubmit={handleSubmitReveiw}
            />
            <PageHeader>
                <Breadcrumbs />
            </PageHeader>
            <PageContent className={styles.Content}>
                {isSuccess ? (
                    reviews.length ? (
                        <ReviewsScreen reviews={reviews} onAddReview={openAddReviewModal} />
                    ) : (
                        <NoReviewsScreen onAddReview={openAddReviewModal} />
                    )
                ) : null}
            </PageContent>
        </PageLayout>
    );
};
