import { ReactNode, useEffect, useState } from 'react';
import { push } from 'redux-first-history';
import { AddReview } from '@components/add-review';
import { AppLoader } from '@components/app-loader';
import { Breadcrumbs } from '@components/breadcrumbs';
import { PageContent } from '@components/page-content';
import { PageHeader } from '@components/page-header';
import { PageLayout } from '@components/page-layout';
import { ServerErrorModal } from '@components/server-error-modal';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useFetchAllReviewsQuery } from '@redux/reviews';
import { RoutePath } from '@router/paths';

import { NoReviewsScreen } from './no-reviews-screen/no-reviews-screen';
import styles from './feedback-page.module.less';
import { ReviewsScreen } from './reviews-screen';

export const FeedbackPage = () => {
    const {
        data: reviews,
        isError,
        isSuccess,
        isFetching,
    } = useFetchAllReviewsQuery(undefined, { refetchOnMountOrArgChange: true });
    const [showFetchErrorModal, setShowFetchErrorModal] = useState(false);
    const [showAddReview, setShowAddReview] = useState(false);
    const dispatch = useAppDispatch();

    const goToMain = () => {
        dispatch(push(RoutePath.Main));
    };

    useEffect(() => {
        if (isError) {
            setShowAddReview(false);
            setShowFetchErrorModal(true);
        }

        return () => setShowFetchErrorModal(false);
    }, [isError]);

    let content: ReactNode = null;

    if (isSuccess) {
        content = reviews.length ? (
            <ReviewsScreen onAddReview={() => setShowAddReview(true)} reviews={reviews} />
        ) : (
            <NoReviewsScreen onAddReview={() => setShowAddReview(true)} />
        );
    }

    return (
        <PageLayout>
            <AppLoader open={isFetching} />
            <ServerErrorModal onCancel={goToMain} open={showFetchErrorModal} />
            <AddReview
                onOpenChange={setShowAddReview}
                open={showAddReview}
                refetchOnSuccess={true}
            />
            <PageHeader>
                <Breadcrumbs />
            </PageHeader>
            <PageContent className={styles.Content}>{content}</PageContent>
        </PageLayout>
    );
};
