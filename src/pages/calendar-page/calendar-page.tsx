import { AppLoader } from '@components/app-loader';
import { Breadcrumbs } from '@components/breadcrumbs';
import { Modal } from '@components/modal';
import { PageContent } from '@components/page-content';
import { PageHeader } from '@components/page-header';
import { PageLayout } from '@components/page-layout';
import { ServerErrorModal } from '@components/server-error-modal';
import { useFetchTrainingCatalogQuery } from '@redux/catalogs';
import { useFetchTrainingListQuery } from '@redux/training';
import { Path } from '@router/paths';
import { Typography } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from './calendar';
import styles from './calendar-page.module.less';

const CalendarPage = () => {
    const navigate = useNavigate();

    const {
        isFetching: isTrainingListFetching,
        isSuccess: isTrainingListSuccess,
        isError: isTrainingListError,
    } = useFetchTrainingListQuery();

    const {
        isFetching: isTrainingCatalogFetching,
        isError: isTrainingCatalogError,
        refetch: refetchTrainingCatalog,
    } = useFetchTrainingCatalogQuery();

    useEffect(() => {
        if (isTrainingListSuccess && isTrainingCatalogError) {
            const modal = Modal.info({
                title: 'При открытии данных произошла ошибка',
                okText: 'Обновить',
                content: (
                    <Typography.Paragraph type='secondary'>
                        Попробуйте ещё раз.
                    </Typography.Paragraph>
                ),
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
            <AppLoader open={isTrainingListFetching || isTrainingCatalogFetching} />
            <ServerErrorModal open={isTrainingListError} onCancel={() => navigate(Path.Main)} />
            <PageLayout className={styles.Layout}>
                <PageHeader>
                    <Breadcrumbs />
                </PageHeader>
                <PageContent className={styles.Content}>
                    {isTrainingListSuccess && <Calendar />}
                </PageContent>
            </PageLayout>
        </>
    );
};

export default CalendarPage;
