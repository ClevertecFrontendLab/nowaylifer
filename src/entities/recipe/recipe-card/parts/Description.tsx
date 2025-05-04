import { Text, TextProps } from '@chakra-ui/react';

import { useRecipeCardStyles, useRecipeContext } from '../context';

export const RecipeCardDescription = (props: TextProps) => {
    const styles = useRecipeCardStyles();
    const { recipe } = useRecipeContext();
    return (
        <Text {...styles.description} {...props}>
            {recipe.description}
        </Text>
    );
};
