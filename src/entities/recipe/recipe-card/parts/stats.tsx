import { Box, BoxProps } from '@chakra-ui/react';

import { BookmarksStat, LikesStat } from '~/shared/ui/stats';

import { useRecipeCardStyles, useRecipeContext } from '../context';

export const RecipeCardStats = (props: BoxProps) => {
    const styles = useRecipeCardStyles();
    const { recipe } = useRecipeContext();
    return (
        <Box __css={styles.stats} {...props}>
            {recipe.bookmarks > 0 && <BookmarksStat value={recipe.bookmarks} />}
            {recipe.likes > 0 && <LikesStat value={recipe.likes} />}
        </Box>
    );
};
