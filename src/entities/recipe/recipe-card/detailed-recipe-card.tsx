import { Box, HStack } from '@chakra-ui/react';

import { ClockIcon } from '~/shared/ui/icons/clock';
import { PluralForms, pluralizeRu } from '~/shared/util';

import { RecipeCardBadge } from './parts/badge';
import { RecipeCardBody } from './parts/body';
import { RecipeCardCategoryList } from './parts/category';
import { RecipeCardDescription } from './parts/description';
import { RecipeCardImage } from './parts/image';
import { RecipeCardRoot } from './parts/root';
import { RecipeCardStats } from './parts/stats';
import { RecipeCardTitle } from './parts/title';
import { RecipeCardProps } from './props';

const forms: PluralForms = {
    one: 'минута',
    few: 'минуты',
    many: 'минут',
    other: 'минут',
};

const formatTime = (timeInMinutes: number) =>
    `${timeInMinutes} ${pluralizeRu(timeInMinutes, forms)}`;

export const DetailedRecipeCard = ({ recipe, actionSlot, ...rootProps }: RecipeCardProps) => (
    <RecipeCardRoot asLinkBox={false} recipe={recipe} {...rootProps}>
        <RecipeCardImage />
        <RecipeCardBody>
            <Box order={1} flexGrow={1}>
                <RecipeCardTitle asLink={false} />
                <RecipeCardDescription />
            </Box>
            <HStack order={0} justify='space-between' gap={1}>
                <RecipeCardCategoryList />
                <RecipeCardStats />
            </HStack>
            <HStack order={2} alignItems='end' wrap={{ base: 'wrap', md: 'nowrap' }} gap={3}>
                <RecipeCardBadge bg='blackAlpha.100' mr='auto'>
                    <ClockIcon />
                    {formatTime(recipe.time)}
                </RecipeCardBadge>
                <HStack gap={{ base: 3, '2xl': 4 }}>{actionSlot}</HStack>
            </HStack>
        </RecipeCardBody>
    </RecipeCardRoot>
);
