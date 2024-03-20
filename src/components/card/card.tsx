import { Card as CardAntd, CardProps } from 'antd';
import styles from './card.module.less';
import cn from 'classnames';
import { ComponentProps, FC } from 'react';

const CardInner: FC<CardProps> = ({ className, ...props }) => (
    <CardAntd className={cn(styles.Card, className)} bordered={false} {...props} />
);

const CardBody = ({ className, ...props }: ComponentProps<'div'>) => (
    <div className={cn(styles.CardBody, className)} {...props} />
);

const CardHeader = ({ className, ...props }: ComponentProps<'div'>) => (
    <div className={cn(styles.CardHeader, className)} {...props} />
);

const CardFooter = ({ className, ...props }: ComponentProps<'div'>) => (
    <div className={cn(styles.CardFooter, className)} {...props} />
);

export const Card = Object.assign(CardInner, {
    Header: CardHeader,
    Body: CardBody,
    Footer: CardFooter,
    Grid: CardAntd.Grid,
    Meta: CardAntd.Meta,
});

Card.displayName = 'Card';
