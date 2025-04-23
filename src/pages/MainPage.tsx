import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Center, Heading, HStack, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';

import { RecipeCard, recipeCategoryMap } from '~/entities/recipe';
import { mockRecipes } from '~/entities/recipe/mock-recipes';
import { filterRecipe, selectAppliedFilterGroups } from '~/features/filter-recipe';
import {
    clearRecipeSearch,
    filterMatchingRecipe,
    HighlightSearchMatch,
    selectRecipeSearch,
} from '~/features/search-recipe';
import { useAppDispatch, useAppSelector } from '~/shared/store';
import { BlogCard } from '~/shared/ui/BlogCard';
import { Button } from '~/shared/ui/Button';
import { Link } from '~/shared/ui/Link';
import { Section, SectionHeading } from '~/shared/ui/Section';
import { RecipeSlider } from '~/widgets/RecipeSlider';
import { SearchBar } from '~/widgets/SearchBar';

export default function MainPage() {
    const search = useAppSelector(selectRecipeSearch);
    const filterGroups = useAppSelector(selectAppliedFilterGroups);
    const dispatch = useAppDispatch();
    const showAllRecipes = !!search || !!filterGroups.length;

    useEffect(
        () => () => {
            dispatch(clearRecipeSearch());
        },
        [dispatch],
    );

    return (
        <Box as='main' py={{ base: 4, lg: 8 }}>
            <VStack justify='center' mb={{ base: 8, lg: '58px' }} px={{ base: 4, md: 5, lg: 6 }}>
                <Heading fontSize={{ base: '2xl', lg: '5xl' }} mb={{ base: 4, lg: 8 }}>
                    Приятного аппетита!
                </Heading>
                <Box w='full' maxW='518px'>
                    <SearchBar />
                </Box>
            </VStack>
            {showAllRecipes && (
                <Box>
                    <SimpleGrid
                        mb={4}
                        spacing={{ base: 3, md: 4, '2xl': 6 }}
                        minChildWidth={{ base: '328px', lg: '668px' }}
                        autoRows='1fr'
                    >
                        {mockRecipes
                            .filter(
                                (r) =>
                                    filterMatchingRecipe(r, search) &&
                                    filterRecipe(r, filterGroups),
                            )
                            .map((r, i) => (
                                <RecipeCard
                                    key={r.id}
                                    recipe={r}
                                    variant='horizontal'
                                    data-test-id={`food-card-${i}`}
                                    renderTitle={(styleProps) => (
                                        <Heading {...styleProps}>
                                            <HighlightSearchMatch query={search}>
                                                {r.title}
                                            </HighlightSearchMatch>
                                        </Heading>
                                    )}
                                />
                            ))}
                    </SimpleGrid>
                    <Center>
                        <Button variant='solid' bg='lime.400' size={{ base: 'md', '2xl': 'lg' }}>
                            Загрузить еще
                        </Button>
                    </Center>
                </Box>
            )}
            {!showAllRecipes && (
                <>
                    <Section>
                        <SectionHeading mb={6}>Новые рецепты</SectionHeading>
                        <RecipeSlider
                            recipes={[...mockRecipes]
                                .sort(
                                    (a, b) =>
                                        new Date(b.date).valueOf() - new Date(a.date).valueOf(),
                                )
                                .slice(0, 10)}
                        />
                    </Section>
                    <Section>
                        <HStack justify='space-between' mb={6}>
                            <SectionHeading>Самое сочное</SectionHeading>
                            <Button
                                as={Link}
                                to='/the-juiciest'
                                hideBelow='lg'
                                variant='solid'
                                bg='lime.400'
                                data-test-id='juiciest-link'
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
                            <RecipeCard
                                data-test-id='card-link-0'
                                variant='horizontal'
                                recipe={mockRecipes[7]}
                            />
                            <RecipeCard
                                data-test-id='card-link-1'
                                variant='horizontal'
                                recipe={mockRecipes[13]}
                            />
                            <RecipeCard
                                data-test-id='card-link-2'
                                variant='horizontal'
                                recipe={mockRecipes[14]}
                            />
                            <RecipeCard
                                datat-test-id='card-link-3'
                                variant='horizontal'
                                recipe={mockRecipes[12]}
                            />
                        </SimpleGrid>
                        <Center hideFrom='lg'>
                            <Button
                                as={Link}
                                to='/juicied'
                                variant='solid'
                                bg='lime.400'
                                data-test-id='juiciest-link-mobile'
                                rightIcon={<ArrowForwardIcon />}
                                size={{ base: 'md', '2xl': 'lg' }}
                            >
                                Вся подборка
                            </Button>
                        </Center>
                    </Section>
                    <Section>
                        <Box bg='lime.300' borderRadius='2xl' p={{ base: 3, lg: 6 }}>
                            <HStack
                                align='center'
                                justify='space-between'
                                mb={{ base: 3, lg: 5, '2xl': 8 }}
                            >
                                <Heading
                                    fontSize={{ base: '2xl', lg: '3xl', '2xl': '4xl' }}
                                    fontWeight='medium'
                                >
                                    Кулинарные блоги
                                </Heading>
                                <Button
                                    hideBelow='lg'
                                    variant='ghost'
                                    size={{ base: 'md', '2xl': 'lg' }}
                                    rightIcon={<ArrowForwardIcon />}
                                >
                                    Все авторы
                                </Button>
                            </HStack>
                            <SimpleGrid
                                columns={{ base: 1, md: 3 }}
                                spacing={{ base: 3, lg: 4 }}
                                mb={{ base: 3, lg: 0 }}
                            >
                                <BlogCard
                                    content='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                                    author={{
                                        displayName: 'Елена Высоцкая',
                                        username: '@elenapovar',
                                        avatarSrc: '/images/elena.png',
                                    }}
                                />
                                <BlogCard
                                    content='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                                    author={{
                                        displayName: 'Alex Cook',
                                        username: '@funtasticooking',
                                        avatarSrc: '/images/alex.png',
                                    }}
                                />
                                <BlogCard
                                    content='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                                    author={{
                                        displayName: 'Екатерина Константинопольская',
                                        username: '@bake_and_pie',
                                        avatarSrc: '/images/ekaterina.png',
                                    }}
                                />
                            </SimpleGrid>
                            <Center hideFrom='lg'>
                                <Button
                                    variant='ghost'
                                    size={{ base: 'md', '2xl': 'lg' }}
                                    rightIcon={<ArrowForwardIcon />}
                                >
                                    Все авторы
                                </Button>
                            </Center>
                        </Box>
                    </Section>
                    <Section>
                        <Stack
                            gap={3}
                            pt={{ base: 2, lg: 6 }}
                            borderTopWidth='1px'
                            borderColor='blackAlpha.200'
                            align={{ base: 'start', lg: 'center' }}
                            justify='space-between'
                            mb={{ base: 4, lg: 6 }}
                            direction={{ base: 'column', lg: 'row' }}
                        >
                            <SectionHeading flex={1}>
                                {recipeCategoryMap.vegan.label}
                            </SectionHeading>
                            <Text
                                flex={{ base: 2, '2xl': 1 }}
                                fontWeight='medium'
                                color='blackAlpha.700'
                                fontSize={{ base: 'sm', lg: 'md' }}
                            >
                                {recipeCategoryMap.vegan.description}
                            </Text>
                        </Stack>
                        <Stack
                            direction={{ base: 'column', md: 'row' }}
                            gap={{ base: 3, lg: 4, '2xl': 6 }}
                        >
                            <RecipeCard
                                variant='no-image'
                                recipe={mockRecipes[0]}
                                flexShrink={0}
                                maxW={{
                                    base: 'full',
                                    md: '232px',
                                    lg: '248px',
                                    '1.5xl': '282px',
                                    '2xl': '322px',
                                }}
                            />
                            <RecipeCard
                                variant='no-image'
                                recipe={mockRecipes[5]}
                                flexShrink={0}
                                maxW={{
                                    base: 'full',
                                    md: '232px',
                                    lg: '248px',
                                    '1.5xl': '282px',
                                    '2xl': '322px',
                                }}
                            />
                            <Stack minW={0} flex={{ base: 'auto', md: 1 }} gap={3}>
                                <RecipeCard variant='compact' recipe={mockRecipes[16]} />
                                <RecipeCard variant='compact' recipe={mockRecipes[17]} />
                                <RecipeCard variant='compact' recipe={mockRecipes[18]} />
                            </Stack>
                        </Stack>
                    </Section>
                </>
            )}
        </Box>
    );
}
