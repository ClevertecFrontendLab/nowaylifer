import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Center, HStack, SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import { Link } from 'react-router';

import { selectCategoriesInvariant } from '~/entities/category';
import { buildRecipeLink, getRecipeRootCategories, recipeApi, RecipeCard } from '~/entities/recipe';
import { useAppSelector } from '~/shared/store';
import { TestId } from '~/shared/test-ids';
import { Section, SectionHeading } from '~/shared/ui/Section';

export const JuiciestSection = () => {
    const { categoryById } = useAppSelector(selectCategoriesInvariant);
    const { data: recipes } = recipeApi.useRecipesQuery({
        sortBy: 'likes',
        sortOrder: 'desc',
        limit: 4,
    });

    const md = useBreakpointValue({ base: false, md: true, lg: false });

    return (
        <Box as='main' py={{ base: 4, lg: 8 }}>
            <Section>
                <HStack justify='space-between' mb={6}>
                    <SectionHeading>Самое сочное</SectionHeading>
                    <Button
                        as={Link}
                        to='/the-juiciest'
                        hideBelow='lg'
                        variant='solid'
                        bg='lime.400'
                        data-test-id={md ? undefined : TestId.JUICIEST_LINK}
                        rightIcon={<ArrowForwardIcon />}
                        size={{ base: 'md', '2xl': 'lg' }}
                    >
                        Вся подборка
                    </Button>
                </HStack>
                <SimpleGrid
                    mb={{ base: 3, lg: 0 }}
                    spacing={{ base: 3, md: 4, '2xl': 6 }}
                    minChildWidth={{ base: '328px', lg: '668px' }}
                >
                    {recipes?.map((r, idx) => (
                        <RecipeCard
                            key={r._id}
                            recipe={r}
                            variant='horizontal'
                            categories={getRecipeRootCategories(r, categoryById)}
                            recipeLink={buildRecipeLink(r, categoryById)}
                            testId={{ link: TestId.recipeCardLink(idx) }}
                        />
                    ))}
                </SimpleGrid>
                <Center hideFrom='lg'>
                    <Button
                        as={Link}
                        to='/the-juiciest'
                        variant='solid'
                        bg='lime.400'
                        data-test-id={md ? TestId.JUICIEST_LINK : TestId.JUICIEST_LINK_MOBILE}
                        rightIcon={<ArrowForwardIcon />}
                        size={{ base: 'md', '2xl': 'lg' }}
                    >
                        Вся подборка
                    </Button>
                </Center>
            </Section>
        </Box>
    );
};
