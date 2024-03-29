import { Card, CardProps } from '@components/card';
import cn from 'classnames';

import styles from './page-content-card.module.less';

export const PageContentCard = ({ className, ...props }: CardProps) => (
    <Card className={cn(styles.PageContentCard, className)} {...props} />
);
