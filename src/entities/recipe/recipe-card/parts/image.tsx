import { Box, BoxProps, Image } from '@chakra-ui/react';

import { useRecipeCardStyles, useRecipeContext } from '../context';

export const RecipeCardImage = (props: BoxProps) => {
    const styles = useRecipeCardStyles();
    const { recipe } = useRecipeContext();
    return (
        <Box __css={styles.imageContainer} {...props}>
            <Image src={recipe.image} {...styles.image} {...props} />
        </Box>
    );
};
