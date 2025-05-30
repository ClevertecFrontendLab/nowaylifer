import { Box, Button, HStack, LinkOverlay } from '@chakra-ui/react';
import { LinkProps } from 'react-router';

import { Link } from '~/shared/ui/link';

import { useRecipeContext } from './context';
import { RecipeCardBody } from './parts/body';
import { RecipeCardCategoryList } from './parts/category';
import { RecipeCardDescription } from './parts/description';
import { RecipeCardImage } from './parts/image';
import { RecipeCardRoot } from './parts/root';
import { RecipeCardStats } from './parts/stats';
import { RecipeCardTitle } from './parts/title';
import { RecipeCardProps } from './props';

export const HorizontalRecipeCard = ({
    renderTitle,
    actionSlot,
    ...rootProps
}: RecipeCardProps) => (
    <RecipeCardRoot asLinkBox {...rootProps}>
        <RecipeCardImage />
        <RecipeCardBody>
            <Box order={1} flexGrow={1}>
                <RecipeCardTitle>{renderTitle}</RecipeCardTitle>
                <RecipeCardDescription />
            </Box>
            <HStack align='start' justify='space-between' order={0}>
                <RecipeCardCategoryList />
                <RecipeCardStats />
            </HStack>
            <HStack gap={2} justifyContent='end' order={2}>
                {actionSlot}
                <CookRecipeLink />
            </HStack>
        </RecipeCardBody>
    </RecipeCardRoot>
);

const CookRecipeLink = (props: Omit<LinkProps, 'to'>) => {
    const { recipeLink, testId } = useRecipeContext();
    return (
        <LinkOverlay as={Link} to={recipeLink} data-test-id={testId?.link} {...props}>
            <Button as={Box} variant='inverted' size={{ base: 'xs', lg: 'sm' }}>
                Готовить
            </Button>
        </LinkOverlay>
    );
};
