import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Center, HStack } from '@chakra-ui/react';
import { Link } from 'react-router';

import { selectCategoriesInvariant } from '~/entities/category';
import {
    buildRecipePath,
    getRecipeRootCategories,
    recipeApi,
    RecipeCard,
    RecipeCardsGrid,
} from '~/entities/recipe';
import { useAppLoader } from '~/shared/infra/app-loader';
import { RoutePath } from '~/shared/router';
import { useAppSelector } from '~/shared/store';
import { TestId } from '~/shared/test-ids';
import { ButtonProps } from '~/shared/ui/button';
import { Section, SectionHeading } from '~/shared/ui/section';

export const JuiciestSection = () => {
    const { categoryById } = useAppSelector(selectCategoriesInvariant);
    const { data: recipes, isLoading } = recipeApi.useRecipesQuery({
        sortBy: 'likes',
        sortOrder: 'desc',
        limit: 4,
    });

    useAppLoader(isLoading);

    return (
        <Box as='main' py={{ base: 4, lg: 8 }}>
            <Section>
                <HStack justify='space-between' mb={6}>
                    <SectionHeading>Самое сочное</SectionHeading>
                    <JuiciestLink hideBelow='lg' data-test-id={TestId.JUICIEST_LINK} />
                </HStack>
                <RecipeCardsGrid mb={{ base: 3, lg: 0 }}>
                    {recipes?.map((r, idx) => (
                        <RecipeCard
                            key={r._id}
                            recipe={r}
                            variant='horizontal'
                            categories={getRecipeRootCategories(r, categoryById)}
                            recipeLink={buildRecipePath(r, categoryById)}
                            testId={{ link: TestId.recipeCardLink(idx) }}
                        />
                    ))}
                </RecipeCardsGrid>
                <Center hideFrom='lg'>
                    <JuiciestLink data-test-id={TestId.JUICIEST_LINK_MOBILE} />
                </Center>
            </Section>
        </Box>
    );
};

const JuiciestLink = (props: ButtonProps) => (
    <Button
        as={Link}
        to={RoutePath.Juiciest}
        variant='solid'
        bg='lime.400'
        rightIcon={<ArrowForwardIcon />}
        size={{ base: 'md', '2xl': 'lg' }}
        {...props}
    >
        Вся подборка
    </Button>
);
