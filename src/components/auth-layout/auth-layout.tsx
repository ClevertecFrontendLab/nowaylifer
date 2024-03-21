import { Outlet } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Layout } from 'antd';

import { LoaderModal } from '../loader-modal';

import styles from './auth-layout.module.less';

const Backdrop = () => <div className={styles.Backdrop} />;

export const AuthLayout = () => {
    const authLoading = useAppSelector((state) => state.auth.authLoading);

    return (
        <Layout className={styles.Layout}>
            <Layout.Content className={styles.Content}>
                <LoaderModal mask={false} open={authLoading} />
                <Outlet />
                <Backdrop />
            </Layout.Content>
        </Layout>
    );
};
