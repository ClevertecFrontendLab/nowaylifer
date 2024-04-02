import { Fragment, useEffect } from 'react';
import { AppLoader, useAppLoader } from '@components/app-loader';
import { Breadcrumbs } from '@components/breadcrumbs';
import { PageContent } from '@components/page-content';
import { PageContentCard } from '@components/page-content-card';
import { PageHeader } from '@components/page-header';
import { PageLayout } from '@components/page-layout';
import { useFetchTrainingCatalogQuery } from '@redux/catalogs';
import { useFetchTrainingListQuery } from '@redux/training';
import { Tabs } from 'antd';

import { WORKOUTS_PAGE_LOADER_ID } from './load-workouts-page';
import styles from './workouts-page.module.less';

const tabItems = [
    { label: 'Мои тренировки', key: 'myTrainings' },
    { label: 'Совместные тренировки', key: 'joinTrainings' },
    { label: 'Марафоны', key: 'marathons' },
];

const WorkoutsPage = () => {
    const appLoader = useAppLoader();
    const { isFetching: isTrainingListFetching } = useFetchTrainingListQuery();
    const { isFetching: isTrainingCatalogFetching } = useFetchTrainingCatalogQuery();

    useEffect(() => {
        appLoader.close(WORKOUTS_PAGE_LOADER_ID);
    }, [appLoader]);

    return (
        <Fragment>
            <AppLoader open={isTrainingCatalogFetching || isTrainingListFetching} />
            <PageLayout>
                <PageHeader>
                    <Breadcrumbs />
                </PageHeader>
                <PageContent>
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
