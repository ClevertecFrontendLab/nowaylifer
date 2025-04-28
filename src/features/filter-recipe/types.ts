import { Recipe } from '~/entities/recipe';

import { filterConfig } from './filter-config';

export type FilterType = keyof typeof filterConfig;

export type FilterMatcher = (recipe: Recipe, filter: Filter) => boolean;

export type Filter = { type: FilterType; label: string; value: string };

export type FilterGroup = { type: FilterType; filters: Filter[] };

export type FilterOption = Filter & { testId?: string };
