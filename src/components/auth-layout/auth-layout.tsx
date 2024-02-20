import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import styles from './auth-layout.module.less';

const Backdrop = () => <div className={styles.Backdrop} />;

export const AuthLayout = () => (
    <Layout className={styles.Layout}>
        <Layout.Content className={styles.Content}>
            <Outlet />
            <Backdrop />
        </Layout.Content>
    </Layout>
);
