import { Box, BoxProps, Image } from '@chakra-ui/react';

import { buildImageSrc } from '~/shared/util';

import { useRecipeCardStyles, useRecipeContext } from '../context';

export const RecipeCardImage = (props: BoxProps) => {
    const styles = useRecipeCardStyles();
    const { recipe } = useRecipeContext();
    return (
        <Box __css={styles.imageContainer} {...props}>
            <Image
                src={recipe.image ? buildImageSrc(recipe.image) : undefined}
                {...styles.image}
                {...props}
            />
        </Box>
    );
};
