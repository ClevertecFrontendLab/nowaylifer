import { Recipe, RecipeCategory, RecipeSubcategory } from './interface';
import { recipeCategoryMap } from './recipe-category';

export const buildRecipeLink = (
    recipe: Recipe,
    activeCategory?: RecipeCategory,
    activeSubcategory?: RecipeSubcategory,
) => {
    const category = activeCategory || recipeCategoryMap[recipe.category[0]];
    const subcategory =
        activeSubcategory ||
        category.subcategories[recipe.subcategory.find((s) => category.subcategories[s])!];

    return `/${category.slug}/${subcategory.slug}/${recipe.id}`;
};
