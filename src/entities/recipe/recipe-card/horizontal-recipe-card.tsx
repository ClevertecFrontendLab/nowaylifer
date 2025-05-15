import {
    Box,
    Button,
    HStack,
    IconButton,
    LinkOverlay,
    StackProps,
    useBreakpointValue,
} from '@chakra-ui/react';

import { BookmarkIcon } from '~/shared/ui/icons/bookmark';
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

export const HorizontalRecipeCard = ({ renderTitle, ...rootProps }: RecipeCardProps) => (
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
            <RecipeCardButtons order={2} />
        </RecipeCardBody>
    </RecipeCardRoot>
);

const RecipeCardButtons = (props: StackProps) => {
    const lg = useBreakpointValue({ base: false, lg: true });
    const { recipeLink, testId } = useRecipeContext();
    return (
        <HStack gap={2} justifyContent='end' {...props}>
            {lg ? (
                <Button variant='outline' size='sm' leftIcon={<BookmarkIcon />}>
                    Сохранить
                </Button>
            ) : (
                <IconButton
                    size='xs'
                    variant='outline'
                    aria-label='Сохранить'
                    icon={<BookmarkIcon />}
                />
            )}
            <LinkOverlay as={Link} to={recipeLink} data-test-id={testId?.link}>
                <Button as={Box} variant='inverted' size={{ base: 'xs', lg: 'sm' }}>
                    Готовить
                </Button>
            </LinkOverlay>
        </HStack>
    );
};
