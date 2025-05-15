import { isFunction, isString } from 'lodash-es';
import { UIMatch, useLocation, useMatches } from 'react-router';

import { BreadcrumbData, RouteBreadcrumb } from './types';

export function useBreadcrumbs(): BreadcrumbData[];
export function useBreadcrumbs<ExtraArg>(extraArg: ExtraArg): BreadcrumbData[];
export function useBreadcrumbs<ExtraArg>(extraArg?: ExtraArg): BreadcrumbData[] {
    const matches = useMatches() as UIMatch<unknown, RouteBreadcrumb<ExtraArg, unknown>>[];
    const location = useLocation();
    return matches
        .filter((match) => match.handle?.crumb)
        .flatMap((match) => {
            const crumb = match.handle.crumb;
            const crumbData = isFunction(crumb)
                ? crumb(match, location, extraArg as ExtraArg)
                : crumb;

            const arr = Array.isArray(crumbData) ? crumbData : [crumbData];
            return arr
                .map((v) => (isString(v) ? { label: v, href: match.pathname } : v))
                .filter((v) => !!v);
        });
}
