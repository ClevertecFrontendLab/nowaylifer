import { runIfFn } from '@chakra-ui/utils';
import { castArray, isString } from 'lodash-es';
import { UIMatch, useLocation, useMatches } from 'react-router';

import { BreadcrumbData, BreadcrumbDefinition, RouteBreadcrumb } from './types';

export function useBreadcrumbs(extraArg?: unknown): BreadcrumbData[] {
    const matches = useMatches() as UIMatch<unknown, RouteBreadcrumb<unknown, unknown>>[];
    const location = useLocation();
    return matches
        .filter((match) => match.handle?.crumb)
        .flatMap((match) => {
            const crumbDefinition = runIfFn(match.handle.crumb, { match, location, extraArg });
            const definitions = castArray(crumbDefinition).filter(Boolean);
            return definitions.map((def) => getBreadcrumbDataFromDefinition(def, match));
        });
}

const getBreadcrumbDataFromDefinition = (definition: BreadcrumbDefinition, match: UIMatch) =>
    isString(definition)
        ? { label: definition, href: match.pathname }
        : { ...definition, href: definition.href ?? match.pathname };
