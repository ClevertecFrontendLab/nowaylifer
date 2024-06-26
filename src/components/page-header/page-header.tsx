import { ComponentProps } from 'react';
import { Layout } from 'antd';
import cn from 'classnames';

import styles from './page-header.module.less';

const { Header } = Layout;

export const PageHeader = ({ className, ...props }: ComponentProps<typeof Header>) => (
    <Header className={cn(styles.Header, className)} {...props} />
);
