import { Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { AppLoader } from '@components/app-loader';
import { PageContent } from '@components/page-content';
import { PageHeader } from '@components/page-header';
import { PageLayout } from '@components/page-layout';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectTariffs, useFetchTariffsQuery } from '@redux/catalogs';
import { useFetchCurrentUserQuery } from '@redux/user';
import { RoutePath } from '@router/paths';
import { Button } from 'antd';

import { Settings } from './settings';
import styles from './settings-page.module.less';

const SettingsPage = () => {
    const { isFetching: isTariffsFetching, isSuccess: isTariffsSuccess } = useFetchTariffsQuery();
    const { isFetching: isUserFetching, isSuccess: isUserSuccess } = useFetchCurrentUserQuery();
    const tariffs = useAppSelector(selectTariffs);
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Fragment>
            <AppLoader open={isTariffsFetching || isUserFetching} />
            <PageLayout>
                <PageHeader>
                    <Button
                        className={styles.GoBackBtn}
                        data-test-id='settings-back'
                        icon={
                            <ArrowLeftOutlined
                                style={{ fontSize: 'var(--font-size-sm)', position: 'relative', top: 2 }}
                            />
                        }
                        onClick={() =>
                            location.key === 'default' ? navigate(RoutePath.Profile) : navigate(-1)
                        }
                        size='large'
                        type='text'
                    >
                        Настройки
                    </Button>
                </PageHeader>
                <PageContent className={styles.Content}>
                    {isUserSuccess && isTariffsSuccess && <Settings tariffs={tariffs} />}
                </PageContent>
            </PageLayout>
        </Fragment>
    );
};

export default SettingsPage;
