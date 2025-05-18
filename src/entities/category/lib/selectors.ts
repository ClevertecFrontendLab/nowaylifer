import invariant from 'invariant';
import { shallowEqual } from 'react-redux';
import { Params } from 'react-router';

import { createAppSelector } from '~/shared/store';

import { categoryApi } from '../api';
import { ActiveCategories, getSortedCategorySlugs, MaybeActiveCategories } from '../lib/util';
import { Category } from '../types';

export const selectCategories = createAppSelector(
    categoryApi.endpoints.categories.select(),
    (res) => res.data,
);

export const selectCategoriesInvariant = (state: RootState) => {
    const categories = selectCategories(state);
    invariant(categories, 'Categories state is not initialized');
    return categories;
};

export const selectCategoryBySlug = createAppSelector(
    [selectCategories, (_, slug: string) => slug, (_, __, parent?: Category) => parent],
    (categories, slug, parent) => {
        const arr = parent ? parent.subCategories : categories?.rootCategories;
        return arr?.find((c) => c.category === slug);
    },
);

export const selectActiveCategories = createAppSelector(
    [(state) => state, (_, params: Params) => getSortedCategorySlugs(params)],
    (state, slugs): MaybeActiveCategories => {
        const result: MaybeActiveCategories = [];

        for (const slug of slugs) {
            const category = selectCategoryBySlug(state, slug, result.at(-1));
            if (!category) break;
            result.push(category);
        }

        return result;
    },
    { memoizeOptions: { resultEqualityCheck: shallowEqual } },
);

export const selectActiveCategoriesInvariant = (
    ...args: Parameters<typeof selectActiveCategories>
) => {
    const categories = selectActiveCategories(...args);
    invariant(categories.length >= 2, "Can't be less than two active categories");
    return categories as ActiveCategories;
};
