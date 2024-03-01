import { Breadcrumbs } from '@components/breadcrumbs';
import { PageContent } from '@components/page-content';
import { PageHeader } from '@components/page-header';
import { PageLayout } from '@components/page-layout';
import { NoReviewsScreen } from './no-reviews-screen/no-reviews-screen';
import { useFetchAllReviewsQuery } from '@redux/reviews';
import { ReviewCard } from './review-card';

export const FeedbackPage = () => {
    const { data } = useFetchAllReviewsQuery();
    console.log(data);

    return (
        <PageLayout>
            <PageHeader>
                <Breadcrumbs />
            </PageHeader>
            <PageContent>
                {/* <NoReviewsScreen /> */}
                <ReviewCard
                    review={{
                        fullName: 'Вероника Киверова',
                        message:
                            'Я очень довольна этим приложением! Оно помогает мне следить за своим здоровьем и физической формой, предлагая разнообразные упражнения и питание. Я люблю, что приложение адаптируется к моему уровню и целям, и дает мне полезные советы и обратную связь. Я рекомендую это приложение всем, кто хочет улучшить свою жизнь!',
                        imageSrc: null,
                        createdAt: '2014-04-07T13:58:10.104Z',
                        id: '1',
                        rating: 4,
                    }}
                />
            </PageContent>
        </PageLayout>
    );
};
