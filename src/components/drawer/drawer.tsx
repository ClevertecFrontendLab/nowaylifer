import { ReactNode } from 'react';
import { useXss } from '@hooks/use-breakpoint';
import { Drawer as DrawerAntd, DrawerProps as DrawerPropsAntd } from 'antd';
import cn from 'classnames';

import styles from './drawer.module.less';

type DrawerProps = DrawerPropsAntd & {
    titleIcon?: ReactNode;
};

export const Drawer = ({ className, title, titleIcon, ...props }: DrawerProps) => {
    const xss = useXss();

    return (
        <DrawerAntd
            className={cn(styles.Drawer, className)}
            destroyOnClose={true}
            height={xss ? '90%' : undefined}
            mask={false}
            placement={xss ? 'bottom' : 'right'}
            title={
                <div className={styles.TitleWrap}>
                    <span className={styles.TitleIcon}>{titleIcon}</span>
                    {title}
                </div>
            }
            width={xss ? '100%' : 408}
            {...props}
        />
    );
};
