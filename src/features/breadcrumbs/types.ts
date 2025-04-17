import { UIMatch } from 'react-router';

export interface RouteHandle {
    breadcrumb?:
        | string
        | BreadcrumbData
        | (string | BreadcrumbData)[]
        | ((
              match: UIMatch<unknown, RouteHandle | undefined>,
          ) => string | BreadcrumbData | (string | BreadcrumbData)[]);
}

export type BreadcrumbData = { href: string; label: string };
