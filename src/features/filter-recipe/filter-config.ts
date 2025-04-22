import { FilterMatcher } from './types';

export const filterConfig = {
    allergens: {
        method: 'every',
        matcher: (recipe, filter) =>
            !recipe.ingredients.find((i) => i.title.includes(filter.value)),
    },
    authors: {
        method: 'some',
        matcher: () => true,
    },
    categories: {
        method: 'some',
        matcher: (recipe, filter) => recipe.category.includes(filter.value),
    },
    meat: {
        method: 'some',
        matcher: (recipe, filter) => filter.value === recipe.meat,
    },
    side: {
        method: 'some',
        matcher: (recipe, filter) => filter.value === recipe.side,
    },
} satisfies Record<string, { matcher: FilterMatcher; method: 'every' | 'some' }>;
