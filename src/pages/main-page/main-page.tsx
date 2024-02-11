import { Layout } from 'antd';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { Main } from './main';
import styles from './main-page.module.css';

export const MainPage = () => {
    return (
        <Layout className={styles.Layout}>
            <Sidebar />
            <Layout>
                <Header />
                <Main />
            </Layout>
        </Layout>
    );
};
