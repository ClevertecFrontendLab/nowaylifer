import { Box, Button, HStack } from '@chakra-ui/react';

import { BookmarkIcon } from '~/shared/ui/BookmarkIcon';
import { ClockIcon } from '~/shared/ui/ClockIcon';
import { EmojiHeartEyesIcon } from '~/shared/ui/EmojiHeartEyesIcon';

import { RecipeCardBadge } from './parts/Badge';
import { RecipeCardBody } from './parts/Body';
import { RecipeCardCategoryList } from './parts/Category';
import { RecipeCardDescription } from './parts/Description';
import { RecipeCardImage } from './parts/Image';
import { RecipeCardRoot } from './parts/Root';
import { RecipeCardStats } from './parts/Stats';
import { RecipeCardTitle } from './parts/Title';
import { RecipeCardProps } from './props';

export const DetailedRecipeCard = ({ recipe, ...rootProps }: RecipeCardProps) => (
    <RecipeCardRoot asLinkBox={false} recipe={recipe} {...rootProps}>
        <RecipeCardImage />
        <RecipeCardBody>
            <Box order={1} flexGrow={1}>
                <RecipeCardTitle />
                <RecipeCardDescription />
            </Box>
            <HStack order={0} justify='space-between' gap={1}>
                <RecipeCardCategoryList />
                <RecipeCardStats />
            </HStack>
            <HStack order={2} alignItems='end' wrap={{ base: 'wrap', md: 'nowrap' }} gap={3}>
                <RecipeCardBadge bg='blackAlpha.100' mr='auto'>
                    <ClockIcon />
                    {recipe.time}
                </RecipeCardBadge>
                <HStack gap={{ base: 3, '2xl': 4 }}>
                    <Button
                        variant='outline'
                        size={{ base: 'xs', lg: 'sm', '2xl': 'lg' }}
                        leftIcon={<EmojiHeartEyesIcon />}
                    >
                        Оценить рецепт
                    </Button>
                    <Button
                        bg='lime.400'
                        size={{ base: 'xs', lg: 'sm', '2xl': 'lg' }}
                        leftIcon={<BookmarkIcon />}
                    >
                        Сохранить в закладки
                    </Button>
                </HStack>
            </HStack>
        </RecipeCardBody>
    </RecipeCardRoot>
);
