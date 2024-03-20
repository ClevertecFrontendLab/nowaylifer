import { AppLoader } from '@components/app-loader';
import { Breadcrumbs } from '@components/breadcrumbs';
import { PageContent } from '@components/page-content';
import { PageHeader } from '@components/page-header';
import { PageLayout } from '@components/page-layout';
import { ServerErrorModal } from '@components/server-error-modal';
import { useFetchTrainingCatalogQuery } from '@redux/catalogs';
import { useFetchTrainingListQuery } from '@redux/training';
import { Path } from '@router/paths';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrainingCalendar } from './calendar';
import styles from './calendar-page.module.less';
import { showFetchCatalogErrorModal } from './fetch-catalog-error-modal';

const CalendarPage = () => {
    const navigate = useNavigate();

    const {
        isLoading: isTrainingListLoading,
        isSuccess: isTrainingListSuccess,
        isError: isTrainingListError,
    } = useFetchTrainingListQuery();

    const {
        isLoading: isTrainingCatalogLoading,
        isSuccess: isTrainingCatalogSuccess,
        isError: isTrainingCatalogError,
        refetch: refetchTrainingCatalog,
    } = useFetchTrainingCatalogQuery();

    useEffect(() => {
        if (isTrainingListSuccess && isTrainingCatalogError) {
            const modal = showFetchCatalogErrorModal({
                onCancel: () => modal.destroy(),
                onOk: () => {
                    modal.destroy();
                    refetchTrainingCatalog();
                },
            });

            return () => modal.destroy();
        }
    }, [isTrainingCatalogError, isTrainingListSuccess, refetchTrainingCatalog]);

    return (
        <>
            <AppLoader open={isTrainingListLoading || isTrainingCatalogLoading} />
            <ServerErrorModal
                open={isTrainingListError}
                onCancel={() => navigate(Path.Main)}
                data-test-id='modal-no-review'
            />
            <PageLayout className={styles.Layout}>
                <PageHeader>
                    <Breadcrumbs />
                </PageHeader>
                <PageContent className={styles.Content}>
                    <TrainingCalendar
                        disabled={!isTrainingListSuccess || !isTrainingCatalogSuccess}
                    />
                </PageContent>
            </PageLayout>
        </>
    );
};

export default CalendarPage;
