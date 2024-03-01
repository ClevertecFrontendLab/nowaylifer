import { Breadcrumbs } from '@components/breadcrumbs';
import { PageContent } from '@components/page-content';
import { PageHeader } from '@components/page-header';
import { PageLayout } from '@components/page-layout';
import { NoReviewsScreen } from './no-reviews-screen/no-reviews-screen';
import { useFetchAllReviewsQuery } from '@redux/reviews';

export const FeedbackPage = () => {
    const { data } = useFetchAllReviewsQuery();
    console.log(data);

    return (
        <PageLayout>
            <PageHeader>
                <Breadcrumbs />
            </PageHeader>
            <PageContent>
                <NoReviewsScreen />
            </PageContent>
        </PageLayout>
    );
};
