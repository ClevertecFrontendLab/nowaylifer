import { Breadcrumb } from 'antd';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import useBreadcrumbs, { BreadcrumbsRoute } from 'use-react-router-breadcrumbs';
import { Path } from '@router/paths';

type BreadcrumbsProps = {
    className?: string;
};

const routes: BreadcrumbsRoute[] = [
    { path: Path.Root, breadcrumb: 'Главная' },
    { path: Path.Feedback, breadcrumb: 'Отзывы пользователей' },
    { path: Path.Calendar, breadcrumb: 'Календарь' },
];

export const Breadcrumbs = ({ className }: BreadcrumbsProps) => {
    const crumbs = useBreadcrumbs(routes, { disableDefaults: true });

    return (
        <Breadcrumb className={cn(className)}>
            {crumbs.map((crumb) => (
                <Breadcrumb.Item key={crumb.key}>
                    <Link to={crumb.match.pathname}>{crumb.breadcrumb}</Link>
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
};
