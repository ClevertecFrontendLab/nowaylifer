import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import styles from './main-layout.module.less';
import { Sidebar } from './sidebar';

export const MainLayout = () => (
    <Layout className={styles.PageLayout}>
        <Sidebar />
        <Outlet />
    </Layout>
);
