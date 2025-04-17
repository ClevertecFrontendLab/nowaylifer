import { UIMatch, useMatches } from 'react-router';

import { BreadcrumbData, RouteHandle } from './types';

export const useBreadcrumbs = (): BreadcrumbData[] => {
    const matches = useMatches() as UIMatch<unknown, RouteHandle | undefined>[];
    return matches
        .filter((m) => m.handle?.breadcrumb)
        .flatMap((m) => {
            const breadcrumb = m.handle!.breadcrumb!;
            const resolved = typeof breadcrumb === 'function' ? breadcrumb(m) : breadcrumb;
            const arr = Array.isArray(resolved) ? resolved : [resolved];
            return arr.map((v) => (typeof v === 'string' ? { label: v, href: m.pathname } : v));
        });
};
