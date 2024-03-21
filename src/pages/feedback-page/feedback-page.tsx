import { ReactNode, useCallback, useEffect, useState } from 'react';
import { push } from 'redux-first-history';
import { AppLoader } from '@components/app-loader';
import { Breadcrumbs } from '@components/breadcrumbs';
import { PageContent } from '@components/page-content';
import { PageHeader } from '@components/page-header';
import { PageLayout } from '@components/page-layout';
import { ServerErrorModal } from '@components/server-error-modal';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { addAppListener } from '@redux/listener-middleware';
import {
    CreateReviewDTO,
    reviewsApi,
    useAddReviewMutation,
    useFetchAllReviewsQuery,
} from '@redux/reviews';
import { RoutePath } from '@router/paths';

import { NoReviewsScreen } from './no-reviews-screen/no-reviews-screen';
import { AddReviewModal } from './add-review-modal';
import styles from './feedback-page.module.less';
import { AddReviewErrorModal, AddReviewSuccessModal } from './result-modals';
import { ReviewsScreen } from './reviews-screen';

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
        dispatch(push(RoutePath.Main));
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

    let content: ReactNode = null;

    if (isSuccess) {
        content = reviews.length ? (
            <ReviewsScreen onAddReview={openAddReviewModal} reviews={reviews} />
        ) : (
            <NoReviewsScreen onAddReview={openAddReviewModal} />
        );
    }

    return (
        <PageLayout>
            <AppLoader open={isFetching || isAddReviewLoading} />
            <ServerErrorModal onCancel={goToMain} open={showFetchErrorModal} />
            <AddReviewSuccessModal
                onOk={() => setShowAddReviewSuccessModal(false)}
                open={showAddReviewSuccessModal}
            />
            <AddReviewErrorModal
                onCancel={() => setShowAddReviewErrorModal(false)}
                onRetry={retryAddReview}
                open={showAddReviewErrorModal}
            />
            <AddReviewModal
                onCancel={closeAddReviewModal}
                onSubmit={handleSubmitReveiw}
                open={showAddReviewModal}
            />
            <PageHeader>
                <Breadcrumbs />
            </PageHeader>
            <PageContent className={styles.Content}>{content}</PageContent>
        </PageLayout>
    );
};
