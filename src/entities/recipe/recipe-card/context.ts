import { createStylesContext } from '@chakra-ui/react';
import { createContext } from '@chakra-ui/utils';

import { Category } from '~/entities/category/@x/recipe';

import { Recipe } from '../interface';
import { RecipeCardStyles } from './anatomy';

export type RecipeContext = {
    recipe: Recipe;
    recipeLink?: string;
    categories: Category[];
    testId?: Partial<Record<'link' | 'root', string>>;
};
export const [RecipeProvider, useRecipeContext] = createContext<RecipeContext>({
    providerName: 'RecipeProvider',
    hookName: 'useRecipeContext',
});

const [StylesProvider, useStyles] = createStylesContext('RecipeCard');
const useRecipeCardStyles = useStyles as <
    T extends React.ElementType = 'div',
>() => RecipeCardStyles<T>;

export { StylesProvider as RecipeCardStylesProvider, useRecipeCardStyles };
