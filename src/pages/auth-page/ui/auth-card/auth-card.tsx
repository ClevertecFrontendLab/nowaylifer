import type { PropsWithChildren } from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Card } from 'antd';
import cn from 'classnames';

import styles from './auth-card.module.less';

export type AuthCardProps = {
    className?: string;
} & PropsWithChildren;

export const AuthCard = ({ className, children }: AuthCardProps) => {
    const authLoading = useAppSelector((state) => state.auth.authLoading);

    return (
        <Card
            bordered={false}
            className={cn(styles.AuthCard, className, authLoading && styles.Blur)}
        >
            {children}
        </Card>
    );
};
