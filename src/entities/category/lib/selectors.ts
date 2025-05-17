import invariant from 'invariant';
import { shallowEqual } from 'react-redux';
import { Params } from 'react-router';

import { createAppSelector } from '~/shared/store';

import { categoryApi } from '../api';
import { Category } from '../interface';
import { ActiveCategories, CategoryParams, MaybeActiveCategories } from '../lib/util';

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
    [
        selectCategories,
        (_categories, slug: string) => slug,
        (_categoreies, _slug: string, parentCategory?: Category) => parentCategory,
    ],
    (categories, slug, parentCategory) => {
        const arr = parentCategory ? parentCategory.subCategories : categories?.rootCategories;
        return arr?.find((c) => c.category === slug);
    },
);

export const selectActiveCategories = createAppSelector(
    [(state) => state, (_, params: Params<string>) => CategoryParams.getSortedSlugs(params)],
    (state, slugs): MaybeActiveCategories => {
        if (!slugs.length) return [];

        const categories: MaybeActiveCategories = [];

        for (const slug of slugs) {
            const category = selectCategoryBySlug(state, slug, categories.at(-1));
            if (!category) break;
            categories.push(category);
        }

        return categories;
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
