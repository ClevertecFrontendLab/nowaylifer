import {
    ActiveCategories,
    buildCategoryPath,
    CategoryById,
    isRootCategory,
    isSubCategory,
    RootCategory,
    SubCategory,
} from '~/entities/category/@x/recipe';
import { buildImageSrc } from '~/shared/util';

import { Recipe } from './interface';

export const getRecipeRootCategories = (recipe: Recipe, categoryById: CategoryById) => [
    ...new Set(
        recipe.categoriesIds.reduce<RootCategory[]>((acc, id) => {
            const category = categoryById[id];
            if (!category) return acc;
            if (isSubCategory(category)) {
                const rootCategory = categoryById[category.rootCategoryId] as RootCategory;
                return acc.concat(rootCategory);
            }
            return acc.concat(category);
        }, []),
    ),
];

export function buildRecipePath(
    recipe: Recipe,
    categoryById: CategoryById,
    activeCategories?: ActiveCategories,
) {
    if (activeCategories) {
        const [rootCategory, subCategory] = activeCategories;
        return getRecipePath(recipe, rootCategory, subCategory);
    }

    const category = categoryById[recipe.categoriesIds[0]];
    if (!category) return '';

    const rootCategory = isRootCategory(category)
        ? category
        : (categoryById[category.rootCategoryId] as RootCategory);

    const subCategory = rootCategory.subCategories[0];
    return getRecipePath(recipe, rootCategory, subCategory);
}

const getRecipePath = (recipe: Recipe, root: RootCategory, sub: SubCategory) =>
    `${buildCategoryPath(root, sub)}/${recipe._id}`;

export const normalizeRecipeImages = <T extends Recipe>(recipe: T): T => ({
    ...recipe,
    image: buildImageSrc(recipe.image),
    steps: recipe.steps.map(({ image, ...rest }) => ({
        ...rest,
        image: image ? buildImageSrc(image) : image,
    })),
});
