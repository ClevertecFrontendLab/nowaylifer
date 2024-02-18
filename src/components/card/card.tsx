import { Card as CardAntd, CardProps } from 'antd';
import styles from './card.module.less';
import cn from 'classnames';

export const Card = ({ className, ...props }: CardProps) => (
    <CardAntd className={cn(styles.Card, className)} bordered={false} {...props} />
);
