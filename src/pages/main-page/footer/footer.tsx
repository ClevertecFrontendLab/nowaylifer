import { Link } from 'react-router-dom';
import { DownloadAppCard } from '@components/download-app-card';
import { RoutePath } from '@router/paths';
import { Layout } from 'antd';

import styles from './footer.module.less';

export const Footer = () => (
    <Layout.Footer className={styles.Footer}>
        <Link className={styles.Link} data-test-id='see-reviews' to={RoutePath.Feedback}>
            Смотреть отзывы
        </Link>
        <DownloadAppCard className={styles.FooterDownloadApp} />
    </Layout.Footer>
);
