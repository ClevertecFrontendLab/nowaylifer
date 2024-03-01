import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import styles from './app-layout.module.less';
import { Sidebar } from './sidebar';

export const AppLayout = () => (
    <Layout className={styles.AppLayout}>
        <Sidebar />
        <Outlet />
    </Layout>
);
