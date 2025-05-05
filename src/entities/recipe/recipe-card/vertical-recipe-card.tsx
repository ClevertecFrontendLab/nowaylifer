import { Box, HStack } from '@chakra-ui/react';

import { RecipeCardBody } from './parts/body';
import { RecipeCardCategoryList } from './parts/category';
import { RecipeCardDescription } from './parts/description';
import { RecipeCardImage } from './parts/image';
import { RecipeCardRoot } from './parts/root';
import { RecipeCardStats } from './parts/stats';
import { RecipeCardTitle } from './parts/title';
import { RecipeCardProps } from './props';

export const VerticalRecipeCard = ({ variant, ...rootProps }: RecipeCardProps) => (
    <RecipeCardRoot asLinkBox variant={variant} {...rootProps}>
        {variant !== 'no-image' && <RecipeCardImage />}
        <RecipeCardBody>
            <Box flexGrow={1}>
                <RecipeCardTitle />
                <RecipeCardDescription />
            </Box>
            <HStack justify='space-between' gap={0}>
                <RecipeCardCategoryList
                    onlyFirst={variant === 'no-image' ? true : { base: false, lg: true }}
                />
                <RecipeCardStats />
            </HStack>
        </RecipeCardBody>
    </RecipeCardRoot>
);
