import { Layout } from 'antd';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { Main } from './main';
import styles from './main-page.module.less';

export const MainPage = () => (
    <Layout className={styles.PageLayout}>
        <Sidebar />
        <Layout className={styles.MainLayout}>
            <Header />
            <Main />
        </Layout>
    </Layout>
);
