import { Link } from 'react-router-dom';
import { RoutePath } from '@router/paths';
import { Breadcrumb } from 'antd';
import cn from 'classnames';
import useBreadcrumbs, { BreadcrumbsRoute } from 'use-react-router-breadcrumbs';

import styles from './breadcrumbs.module.less';

type BreadcrumbsProps = {
    className?: string;
};

const routes: BreadcrumbsRoute[] = [
    { path: RoutePath.Root, breadcrumb: 'Главная' },
    { path: RoutePath.Feedback, breadcrumb: 'Отзывы пользователей' },
    { path: RoutePath.Calendar, breadcrumb: 'Календарь' },
    { path: RoutePath.Profile, breadcrumb: 'Профиль' },
    { path: RoutePath.Workouts, breadcrumb: 'Тренировки' },
];

export const Breadcrumbs = ({ className }: BreadcrumbsProps) => {
    const crumbs = useBreadcrumbs(routes, { disableDefaults: true });

    return (
        <Breadcrumb className={cn(styles.Breadcrumb, className)}>
            {crumbs.map((crumb) => (
                <Breadcrumb.Item key={crumb.key}>
                    <Link to={crumb.match.pathname}>{crumb.breadcrumb}</Link>
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
};
