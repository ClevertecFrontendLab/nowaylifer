import { Layout } from 'antd';
import cn from 'classnames';
import { ComponentProps } from 'react';
import styles from './page-content.module.less';

const { Content } = Layout;

export const PageContent = ({ className, ...props }: ComponentProps<typeof Content>) => (
    <Content className={cn(styles.PageContent, className)} {...props} />
);
