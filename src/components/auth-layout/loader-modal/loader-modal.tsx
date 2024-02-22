import { Loader } from '@components/loader';
import styles from './loader-modal.module.less';

export const LoaderModal = () => (
    <div className={styles.Modal}>
        <Loader />
    </div>
);
