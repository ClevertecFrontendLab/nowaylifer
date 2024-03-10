import { Breadcrumbs } from '@components/breadcrumbs';
import { PageContent } from '@components/page-content';
import { PageHeader } from '@components/page-header';
import { PageLayout } from '@components/page-layout';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { addAppListener } from '@redux/listener-middleware';
import {
    CreateReviewDTO,
    reviewsApi,
    useAddReviewMutation,
    useFetchAllReviewsQuery,
} from '@redux/reviews';
import { Path } from '@router/paths';
import { useCallback, useEffect, useState } from 'react';
import { push } from 'redux-first-history';
import { AddReviewModal } from './add-review-modal';
import styles from './feedback-page.module.less';
import { NoReviewsScreen } from './no-reviews-screen/no-reviews-screen';
import { AddReviewErrorModal, AddReviewSuccessModal } from './result-modals';
import { ReviewsScreen } from './reviews-screen';
import { AppLoader } from '@components/app-loader';
import { ServerErrorModal } from '@components/server-error-modal';

export const FeedbackPage = () => {
    const {
        data: reviews,
        isError,
        isSuccess,
        isFetching,
    } = useFetchAllReviewsQuery(undefined, { refetchOnMountOrArgChange: true });
    const [addReveiw, { isLoading: isAddReviewLoading }] = useAddReviewMutation();
    const [showAddReviewSuccessModal, setShowAddReviewSuccessModal] = useState(false);
    const [showAddReviewErrorModal, setShowAddReviewErrorModal] = useState(false);
    const [showFetchErrorModal, setShowFetchErrorModal] = useState(false);
    const [showAddReviewModal, setShowAddReviewModal] = useState(false);
    const dispatch = useAppDispatch();

    const openAddReviewModal = useCallback(() => {
        setShowAddReviewModal(true);
    }, []);

    const closeAddReviewModal = () => {
        setShowAddReviewModal(false);
    };

    const retryAddReview = () => {
        setShowAddReviewErrorModal(false);
        openAddReviewModal();
    };

    const goToMain = () => {
        dispatch(push(Path.Main));
    };

    const handleSubmitReveiw = async (dto: CreateReviewDTO) => {
        try {
            await addReveiw(dto).unwrap();
        } catch (error) {
            closeAddReviewModal();
            setShowAddReviewErrorModal(true);
        }
    };

    useEffect(() => {
        if (isError) {
            closeAddReviewModal();
            setShowFetchErrorModal(true);
        }
        return () => setShowFetchErrorModal(false);
    }, [isError]);

    useEffect(
        () =>
            dispatch(
                addAppListener({
                    matcher: reviewsApi.endpoints.addReview.matchFulfilled,
                    effect: async (_, { condition }) => {
                        await condition(reviewsApi.endpoints.fetchAllReviews.matchFulfilled);
                        closeAddReviewModal();
                        setShowAddReviewSuccessModal(true);
                    },
                }),
            ),
        [dispatch],
    );

    return (
        <PageLayout>
            <AppLoader open={isFetching || isAddReviewLoading} />
            <ServerErrorModal open={showFetchErrorModal} onCancel={goToMain} />
            <AddReviewSuccessModal
                open={showAddReviewSuccessModal}
                onOk={() => setShowAddReviewSuccessModal(false)}
            />
            <AddReviewErrorModal
                open={showAddReviewErrorModal}
                onRetry={retryAddReview}
                onCancel={() => setShowAddReviewErrorModal(false)}
            />
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
