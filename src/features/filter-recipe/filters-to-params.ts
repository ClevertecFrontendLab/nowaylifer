import { RootCategory } from '~/entities/category';
import { CategoryById } from '~/entities/category/api';
import { RecipeRequestParams } from '~/entities/recipe';

import { FiltersByGroups } from './types';

export const filtersToParams = (
    filterByGroup: FiltersByGroups,
    categoryById: CategoryById,
): RecipeRequestParams => ({
    allergens: filterByGroup.allergens?.map((f) => f.value),
    garnish: filterByGroup.garnish?.map((f) => f.value),
    meat: filterByGroup.meat?.map((f) => f.value),
    subcategoriesIds: filterByGroup.categories?.flatMap((f) => {
        const category = categoryById[f.value] as RootCategory;
        return category.subCategories.map((c) => c._id);
    }),
});
