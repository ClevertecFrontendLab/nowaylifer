import { Recipe } from '~/entities/recipe';

export const filterMatchingRecipe = (recipe: Recipe, search: string) =>
    search ? recipe.title.toLowerCase().startsWith(search) : true;
