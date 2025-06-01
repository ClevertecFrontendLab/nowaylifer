import { runIfFn } from '@chakra-ui/utils';
import { castArray, isString } from 'lodash-es';
import { useMemo } from 'react';
import { UIMatch, useLocation, useMatches } from 'react-router';

import { BreadcrumbData, BreadcrumbDefinition, RouteBreadcrumb } from './types';

export function useBreadcrumbs(extraArg?: unknown): BreadcrumbData[] {
    const matches = useMatches() as UIMatch<unknown, RouteBreadcrumb<unknown, unknown>>[];
    const location = useLocation();

    return useMemo(
        () =>
            matches.flatMap((match) => {
                const { crumb } = match.handle ?? {};
                if (!crumb) return [];

                const defs = castArray(runIfFn(crumb, { match, location, extraArg }));
                return defs.filter(Boolean).map((def) => getBreadcrumbData(def, match));
            }),
        [matches, location, extraArg],
    );
}

const getBreadcrumbData = (definition: BreadcrumbDefinition, match: UIMatch): BreadcrumbData =>
    isString(definition)
        ? { label: definition, href: match.pathname }
        : { ...definition, href: definition.href ?? match.pathname };
