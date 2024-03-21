import { Link } from 'react-router-dom';
import { Logo } from '@components/logo';
import { useXs } from '@hooks/use-breakpoint';
import { RoutePath } from '@router/paths';

import styles from './sidebar.module.less';

export const SidebarLogo = ({ collapsed }: { collapsed: boolean }) => {
    const xs = useXs();

    let width = 133;

    if (xs) {
        width = 72;
    } else if (collapsed) {
        width = 28.55;
    }

    return (
        <Link to={RoutePath.Main}>
            <Logo
                className={styles.Logo}
                style={{ width }}
                type={collapsed && !xs ? 'short' : 'normal'}
            />
        </Link>
    );
};
