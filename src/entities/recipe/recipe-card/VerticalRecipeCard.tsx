import { Box, HStack } from '@chakra-ui/react';

import { RecipeCardBody } from './parts/Body';
import { RecipeCardCategoryList } from './parts/Category';
import { RecipeCardDescription } from './parts/Description';
import { RecipeCardImage } from './parts/Image';
import { RecipeCardRoot } from './parts/Root';
import { RecipeCardStats } from './parts/Stats';
import { RecipeCardTitle } from './parts/Title';
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
