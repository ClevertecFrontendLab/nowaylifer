import { Card as CardAntd, CardProps } from 'antd';
import styles from './card.module.less';

export const Card = ({ className = '', ...props }: CardProps) => (
    <CardAntd className={`${styles.Card} ${className}`} bordered={false} {...props} />
);
