import { anatomy } from '@chakra-ui/anatomy';
import { HTMLChakraProps } from '@chakra-ui/react';

export const recipeCardAnatomy = anatomy('recipeCard').parts(
    'root',
    'body',
    'image',
    'imageContainer',
    'title',
    'description',
    'stats',
    'category',
    'categoryList',
    'badge',
);

export type RecipeCardStyles<T extends React.ElementType = 'div'> = Record<
    typeof recipeCardAnatomy.__type,
    HTMLChakraProps<T>
>;
