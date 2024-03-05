import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { LoaderModal } from '../loader-modal';
import styles from './auth-layout.module.less';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

const Backdrop = () => <div className={styles.Backdrop} />;

export const AuthLayout = () => {
    const authLoading = useAppSelector((state) => state.auth.authLoading);

    return (
        <Layout className={styles.Layout}>
            <Layout.Content className={styles.Content}>
                <LoaderModal open={authLoading} mask={false} />
                <Outlet />
                <Backdrop />
            </Layout.Content>
        </Layout>
    );
};
