import { UIMatch, useLocation, useMatches } from 'react-router';

import { BreadcrumbData, RouteBreadcrumb } from './types';

export function useBreadcrumbs(): BreadcrumbData[];
export function useBreadcrumbs<ExtraArg>(extraArg: ExtraArg): BreadcrumbData[];
export function useBreadcrumbs<ExtraArg>(extraArg?: ExtraArg): BreadcrumbData[] {
    const matches = useMatches() as UIMatch<unknown, RouteBreadcrumb<ExtraArg, unknown>>[];
    const location = useLocation();
    return matches
        .filter((m) => m.handle?.crumb)
        .flatMap((m) => {
            const crumb = m.handle.crumb;
            const resolved =
                typeof crumb === 'function' ? crumb(m, location, extraArg as ExtraArg) : crumb;
            const arr = Array.isArray(resolved) ? resolved : [resolved];
            return arr
                .map((v) => (typeof v === 'string' ? { label: v, href: m.pathname } : v))
                .filter((v) => !!v);
        });
}
