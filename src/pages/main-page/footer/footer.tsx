import { DownloadAppCard } from '@components/download-app-card';
import { Layout } from 'antd';
import styles from './footer.module.less';

export const Footer = () => (
    <Layout.Footer className={styles.Footer}>
        <a className={styles.Link}>Смотреть отзывы</a>
        <DownloadAppCard className={styles.FooterDownloadApp} />
    </Layout.Footer>
);
