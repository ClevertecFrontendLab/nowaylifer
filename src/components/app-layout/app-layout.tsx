import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import styles from './app-layout.module.less';
import { Sidebar } from './sidebar';

export const AppLayout = () => (
    <Layout className={styles.AppLayout}>
        <Sidebar />
        <Outlet />
    </Layout>
);
