import { Breadcrumbs } from '@components/breadcrumbs';
import { PageContent } from '@components/page-content';
import { PageHeader } from '@components/page-header';
import { PageLayout } from '@components/page-layout';
import { useFetchAllReviewsQuery } from '@redux/reviews';
import { NoReviewsScreen } from './no-reviews-screen/no-reviews-screen';
import { ReviewsScreen } from './reviews-screen';
import styles from './feedback-page.module.less';

export const FeedbackPage = () => {
    const { data: reviews } = useFetchAllReviewsQuery();

    return (
        <PageLayout>
            <PageHeader>
                <Breadcrumbs />
            </PageHeader>
            <PageContent className={styles.Content}>
                {reviews?.length ? <ReviewsScreen reviews={reviews} /> : <NoReviewsScreen />}
            </PageContent>
        </PageLayout>
    );
};
