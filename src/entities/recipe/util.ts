import {
    ActiveCategories,
    CategoryById,
    isRootCategory,
    isSubCategory,
    RootCategory,
    SubCategory,
} from '~/entities/category/@x/recipe';
import { RoutePath } from '~/shared/router';

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
    { edit, activeCategories }: { edit?: boolean; activeCategories?: ActiveCategories } = {},
) {
    if (activeCategories) {
        const [root, sub] = activeCategories;
        return buildRecipeRoutePath({ recipe, root, sub });
    }

    const category = categoryById[recipe.categoriesIds[0]];
    if (!category) return '';

    const root = isRootCategory(category)
        ? category
        : (categoryById[category.rootCategoryId] as RootCategory);

    const sub = root.subCategories[0];

    return buildRecipeRoutePath({ recipe, root, sub, edit });
}

const buildRecipeRoutePath = ({
    recipe,
    root,
    sub,
    edit,
}: {
    recipe: Recipe;
    root: RootCategory;
    sub: SubCategory;
    edit?: boolean;
}) => {
    const builder = edit ? RoutePath.EditRecipe : RoutePath.Recipe;
    return builder.build({
        rootCategory: root.category,
        subCategory: sub.category,
        recipeId: recipe._id,
    });
};
