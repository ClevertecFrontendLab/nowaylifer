import { Recipe } from '~/entities/recipe';

import { FilterRecipeState } from './slice';

export const filterRecipe = (recipe: Recipe, filters: FilterRecipeState) =>
    !recipe.ingredients.find((i) => filters.excludedAllergens.find((a) => a.value === i.title));
