import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import styles from './auth-layout.module.less';

export const AuthLayout = () => (
    <Layout className={styles.Layout}>
        <Layout.Content className={styles.Content}>
            <Outlet />
        </Layout.Content>
    </Layout>
);
