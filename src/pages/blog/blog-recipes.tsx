import { Box, BoxProps, Center, useBoolean } from '@chakra-ui/react';

import { Recipe } from '~/entities/recipe';
import { TestId } from '~/shared/test-ids';
import { LoadMoreButton } from '~/shared/ui/load-more-button';
import { RecipeGrid } from '~/widgets/recipe-grid';

export interface BlogRecipesProps extends BoxProps {
    recipes: Recipe[];
    collapsedMaxCount?: number;
}

export const BlogRecipes = ({ recipes, collapsedMaxCount = 8, ...props }: BlogRecipesProps) => {
    const [isExpanded, { on: expand }] = useBoolean(false);
    const hasMoreRecipes = recipes.length > collapsedMaxCount;

    return (
        <Box {...props}>
            <RecipeGrid
                mb={{ base: 3, md: 4 }}
                recipes={isExpanded ? recipes : recipes.slice(0, collapsedMaxCount)}
                data-test-id={TestId.BLOGGER_RECIPES}
            />
            {hasMoreRecipes && !isExpanded && (
                <Center>
                    <LoadMoreButton onClick={expand} />
                </Center>
            )}
        </Box>
    );
};
