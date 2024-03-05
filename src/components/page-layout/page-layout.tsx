import { Layout, LayoutProps } from 'antd';
import cn from 'classnames';
import styles from './page-layout.module.less';

export const PageLayout = ({ className, ...props }: LayoutProps) => (
    <Layout className={cn(styles.PageLayout, className)} {...props} />
);
