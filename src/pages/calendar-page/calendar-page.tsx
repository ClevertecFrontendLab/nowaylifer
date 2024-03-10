import { AppLoader } from '@components/app-loader';
import { Breadcrumbs } from '@components/breadcrumbs';
import { PageContent } from '@components/page-content';
import { PageHeader } from '@components/page-header';
import { PageLayout } from '@components/page-layout';
import { ServerErrorModal } from '@components/server-error-modal';
import { useFetchTrainingCatalogQuery } from '@redux/catalogs';
import { useFetchTrainingListQuery } from '@redux/training';
import { Path } from '@router/paths';
import { Modal, Typography } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from './calendar';
import styles from './calendar-page.module.less';

const CalendarPage = () => {
    const navigate = useNavigate();

    const {
        data: trainingList = [],
        isFetching: isTrainingListFetching,
        isSuccess: isTrainingListSuccess,
        isError: isTrainingListError,
    } = useFetchTrainingListQuery();

    const {
        data: trainingCatalog = [],
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
                closable: true,
                centered: true,
                maskStyle: {
                    backdropFilter: 'var(--modal-backdrop-filter)',
                    background: 'var(--modal-backdrop-color)',
                },
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
            <PageLayout>
                <PageHeader>
                    <Breadcrumbs />
                </PageHeader>
                <PageContent className={styles.Content}>
                    {isTrainingListSuccess && (
                        <Calendar trainingList={trainingList} trainingCatalog={trainingCatalog} />
                    )}
                </PageContent>
            </PageLayout>
        </>
    );
};

export default CalendarPage;
