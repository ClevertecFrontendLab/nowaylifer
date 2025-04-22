import { Recipe } from '~/entities/recipe';

import { filterConfig } from './filter-config';
import { FilterGroup } from './types';

export const filterRecipe = (recipe: Recipe, groups: FilterGroup[]) =>
    groups.every((group) => {
        const { method, matcher } = filterConfig[group.type];
        return group.filters[method]((filter) => matcher(recipe, filter));
    });
