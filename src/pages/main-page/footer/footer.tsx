import { DownloadAppCard } from '@components/download-app-card';
import { Path } from '@router/paths';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import styles from './footer.module.less';

export const Footer = () => (
    <Layout.Footer className={styles.Footer}>
        <Link to={Path.Feedback} className={styles.Link} data-test-id='see-reviews'>
            Смотреть отзывы
        </Link>
        <DownloadAppCard className={styles.FooterDownloadApp} />
    </Layout.Footer>
);
