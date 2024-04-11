import { Fragment, useEffect } from 'react';
import { AppLoader, useAppLoader } from '@components/app-loader';
import { Breadcrumbs } from '@components/breadcrumbs';
import { PageContent } from '@components/page-content';
import { PageContentCard } from '@components/page-content-card';
import { PageHeader } from '@components/page-header';
import { PageLayout } from '@components/page-layout';
import { showFetchCatalogErrorModal } from '@pages/calendar-page/fetch-catalog-error-modal';
import { useFetchTrainingCatalogQuery } from '@redux/catalogs';
import { useFetchTrainingListQuery } from '@redux/training';
import { Tabs } from 'antd';

import { JointTrainings } from './joint-trainings';
import { WORKOUTS_PAGE_LOADER_ID } from './load-workouts-page';
import { MyTrainings } from './my-trainings';
import styles from './workouts-page.module.less';

const tabItems = [
    { label: 'Мои тренировки', key: 'myTrainings', children: <MyTrainings /> },
    { label: 'Совместные тренировки', key: 'joinTrainings', children: <JointTrainings /> },
    { label: 'Марафоны', key: 'marathons' },
];

const WorkoutsPage = () => {
    const appLoader = useAppLoader();
    const { isFetching: isTrainingListFetching, isSuccess: isTrainingListSuccess } =
        useFetchTrainingListQuery();
    const {
        isFetching: isTrainingCatalogFetching,
        isError: isTrainingCatalogError,
        refetch: refetchTrainingCatalog,
    } = useFetchTrainingCatalogQuery();

    useEffect(() => {
        appLoader.close(WORKOUTS_PAGE_LOADER_ID);
    }, [appLoader]);

    useEffect(() => {
        let modal: { destroy: () => void };

        if (isTrainingListSuccess && isTrainingCatalogError) {
            modal = showFetchCatalogErrorModal({
                onCancel: () => modal.destroy(),
                onOk: () => {
                    modal.destroy();
                    refetchTrainingCatalog();
                },
            });
        }

        return () => modal?.destroy();
    }, [isTrainingCatalogError, isTrainingListSuccess, refetchTrainingCatalog]);

    return (
        <Fragment>
            <AppLoader open={isTrainingCatalogFetching || isTrainingListFetching} />
            <PageLayout>
                <PageHeader>
                    <Breadcrumbs />
                </PageHeader>
                <PageContent className={styles.Content}>
                    <PageContentCard>
                        <Tabs
                            className={styles.Tabs}
                            destroyInactiveTabPane={true}
                            items={tabItems}
                        />
                    </PageContentCard>
                </PageContent>
            </PageLayout>
        </Fragment>
    );
};

export default WorkoutsPage;
