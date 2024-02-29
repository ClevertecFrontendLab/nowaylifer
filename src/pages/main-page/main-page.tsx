import { Layout } from 'antd';
import { Footer } from './footer';
import { Header } from './header';
import { Main } from './main';
import styles from './main-page.module.less';

export const MainPage = () => (
    <Layout className={styles.MainLayout}>
        <Header />
        <Main />
        <Footer />
    </Layout>
);
