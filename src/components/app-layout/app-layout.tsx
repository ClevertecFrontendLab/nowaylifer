import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { usePrefetchUser } from '@redux/user';
import { Layout } from 'antd';

import styles from './app-layout.module.less';
import { Sidebar } from './sidebar';

export const AppLayout = () => {
    const prefetchUser = usePrefetchUser();

    useEffect(() => {
        prefetchUser();
    }, [prefetchUser]);

    return (
        <Layout className={styles.AppLayout}>
            <Sidebar />
            <Outlet />
        </Layout>
    );
};
