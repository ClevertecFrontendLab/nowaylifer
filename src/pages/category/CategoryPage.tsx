import {
    Box,
    Center,
    Heading,
    SimpleGrid,
    Stack,
    Tab,
    TabIndicator,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';

import { RecipeCard, recipeCategoryMap } from '~/entities/recipe';
import { mockRecipes } from '~/entities/recipe/mock-recipes';
import {
    clearRecipeSearch,
    filterMatchingRecipe,
    HighlightSearchMatch,
    selectRecipeSearch,
} from '~/features/search-recipe';
import { useAppDispatch, useAppSelector } from '~/shared/store';
import { Button } from '~/shared/ui/Button';
import { Section, SectionHeading } from '~/shared/ui/Section';
import { SearchBar } from '~/widgets/SearchBar';

import { scrollTabIntoView } from './scroll-tab-into-view';

export function CategoryPage() {
    const params = useParams<'category' | 'subcategory'>();
    const category = recipeCategoryMap[params.category!];
    const subcategory = category.subcategories[params.subcategory!];
    const scrollableRef = useRef<HTMLDivElement>(null);
    const search = useAppSelector(selectRecipeSearch);
    const dispatch = useAppDispatch();
    console.log(search);
    const navigate = useNavigate();

    useEffect(
        () => () => {
            dispatch(clearRecipeSearch());
        },
        [dispatch],
    );

    useEffect(() => {
        const tab = scrollableRef.current?.querySelector<HTMLElement>(
            `[data-index="${subcategory.index}"]`,
        );

        if (!tab || !scrollableRef.current) return;

        scrollTabIntoView({
            scrollable: scrollableRef.current,
            tab,
            offset: 300,
            behavior: 'smooth',
        });
    }, [subcategory]);

    return (
        <Box as='main' py={{ base: 4, lg: 8 }}>
            <VStack justify='center' mb={8} px={{ base: 4, md: 5, lg: 6 }}>
                <Heading fontSize={{ base: '2xl', lg: '5xl' }} mb={4}>
                    {category.label}
                </Heading>
                <Text
                    fontWeight='medium'
                    color='blackAlpha.600'
                    textAlign='center'
                    maxW={{ base: 'full', lg: '696px' }}
                    fontSize={{ base: 'sm', lg: 'md' }}
                    mb={{ base: 4, lg: 8 }}
                >
                    {category.description}
                </Text>
                <Box w='full' maxW='518px'>
                    <SearchBar />
                </Box>
            </VStack>
            <Section>
                <Tabs
                    index={subcategory.index}
                    onChange={(index) => {
                        const subcSlug = Object.values(category.subcategories)[index].slug;
                        navigate(`/${category.slug}/${subcSlug}`);
                    }}
                >
                    <Box
                        ref={scrollableRef}
                        pos='relative'
                        overflowX='auto'
                        sx={{ scrollbarWidth: 'none' }}
                    >
                        <TabList minW='full' w='max-content' border='none'>
                            {Object.values(category.subcategories).map(({ label }) => (
                                <Tab
                                    key={label}
                                    marginBottom={0}
                                    borderBottom='2px solid'
                                    borderColor='chakra-border-color'
                                >
                                    {label}
                                </Tab>
                            ))}
                        </TabList>
                        <TabIndicator key={params.category} />
                    </Box>
                    <TabPanels>
                        {Object.values(category.subcategories).map((subc) => (
                            <TabPanel key={subc.index}>
                                <SimpleGrid
                                    mb={4}
                                    spacing={{ base: 3, md: 4, '2xl': 6 }}
                                    minChildWidth={{ base: '328px', lg: '668px' }}
                                >
                                    {mockRecipes
                                        .filter(
                                            (r) =>
                                                r.category.includes(category.slug) &&
                                                r.subcategory.includes(subc.slug) &&
                                                filterMatchingRecipe(r, search),
                                        )
                                        .map((r) => (
                                            <RecipeCard
                                                key={r.id}
                                                recipe={r}
                                                variant='horizontal'
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
                                    <Button
                                        variant='solid'
                                        bg='lime.400'
                                        size={{ base: 'md', '2xl': 'lg' }}
                                    >
                                        Загрузить еще
                                    </Button>
                                </Center>
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </Section>
            <Section>
                <Stack
                    gap={3}
                    align={{ base: 'start', lg: 'center' }}
                    justify='space-between'
                    mb={{ base: 4, lg: 6 }}
                    pt={{ base: 2, lg: 6 }}
                    borderTopWidth='1px'
                    borderColor='blackAlpha.200'
                    direction={{ base: 'column', lg: 'row' }}
                >
                    <SectionHeading flex={1}>
                        {recipeCategoryMap['desserts-pastry'].label}
                    </SectionHeading>
                    <Text
                        flex={{ base: 2, '2xl': 1 }}
                        fontWeight='medium'
                        color='blackAlpha.700'
                        fontSize={{ base: 'sm', lg: 'md' }}
                    >
                        {recipeCategoryMap['desserts-pastry'].description}
                    </Text>
                </Stack>
                <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: 3, lg: 4, '2xl': 6 }}>
                    <RecipeCard
                        variant='no-image'
                        recipe={mockRecipes[19]}
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
                        recipe={mockRecipes[20]}
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
                        <RecipeCard variant='compact' recipe={mockRecipes[21]} />
                        <RecipeCard variant='compact' recipe={mockRecipes[22]} />
                        <RecipeCard variant='compact' recipe={mockRecipes[23]} />
                    </Stack>
                </Stack>
            </Section>
        </Box>
    );
}
