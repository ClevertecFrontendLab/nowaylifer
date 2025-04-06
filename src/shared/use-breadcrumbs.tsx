import { UIMatch, useLocation, useMatches } from 'react-router';

export const useBreadcrumbs = () => {
    const matches = useMatches() as UIMatch<unknown, RouteHandle | undefined>[];
    const { pathname } = useLocation();
    return matches
        .filter((m) => m.handle?.breadcrumb)
        .map((m) => ({
            active: m.pathname === pathname,
            pathname: m.pathname,
            label:
                typeof m.handle!.breadcrumb === 'function'
                    ? m.handle!.breadcrumb(m)
                    : m.handle!.breadcrumb,
        }));
};

export interface RouteHandle {
    breadcrumb?:
        | string
        | undefined
        | ((match: UIMatch<unknown, RouteHandle | undefined>) => string | undefined);
}
