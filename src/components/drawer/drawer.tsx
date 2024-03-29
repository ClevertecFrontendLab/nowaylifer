import { useXss } from '@hooks/use-breakpoint';
import { Drawer as DrawerAntd, DrawerProps } from 'antd';
import cn from 'classnames';

import styles from './drawer.module.less';

export const Drawer = ({ className, ...props }: DrawerProps) => {
    const xss = useXss();

    return (
        <DrawerAntd
            className={cn(styles.Drawer, className)}
            destroyOnClose={true}
            height={xss ? '90%' : undefined}
            mask={false}
            placement={xss ? 'bottom' : 'right'}
            width={xss ? '100%' : 408}
            {...props}
        />
    );
};
