import { Layout } from 'antd';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { Footer } from './footer';
import { Main } from './main';
import styles from './main-page.module.less';

export const MainPage = () => (
    <Layout className={styles.PageLayout}>
        <Sidebar />
        <Layout className={styles.MainLayout}>
            <Header />
            <Main />
            <Footer />
        </Layout>
    </Layout>
);
