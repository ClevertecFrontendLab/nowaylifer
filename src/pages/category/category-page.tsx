import {
    Box,
    Center,
    Heading,
    SimpleGrid,
    Tab,
    TabIndicator,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    useBreakpointValue,
    VStack,
} from '@chakra-ui/react';
import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router';

import { selectCategoriesInvariant, useActiveCategories } from '~/entities/category';
import {
    buildRecipePath,
    getRecipeRootCategories,
    recipeApi,
    RecipeCard,
    selectFromRecipeInfiniteQueryResult,
} from '~/entities/recipe';
import {
    filtersToParams,
    selectAppliedFiltersByGroup,
    selectIsAppliedFromDrawer,
} from '~/features/filter-recipe';
import {
    HighlightSearchMatch,
    selectAppliedSearchString,
    useUpdateLastSearchResult,
} from '~/features/search-recipe';
import { useAppSelector, useAppSelectorRef } from '~/shared/store';
import { TestId } from '~/shared/test-ids';
import { Button } from '~/shared/ui/button';
import { Section } from '~/shared/ui/section';
import { isE2E } from '~/shared/util';
import { useAppLoader, useShowAppLoader } from '~/widgets/app-loader';
import { RelevantKitchen } from '~/widgets/relevant-kitchen';
import { SearchBar } from '~/widgets/search-bar';

import { scrollTabIntoView } from './scroll-tab-into-view';

export function CategoryPage() {
    const activeCategories = useActiveCategories(true);
    const [rootCategory, subCategory] = activeCategories;
    const isAppliedFromDrawerRef = useAppSelectorRef(selectIsAppliedFromDrawer);
    const searchString = useAppSelector(selectAppliedSearchString);
    const filtersByGroup = useAppSelector(selectAppliedFiltersByGroup);
    const { categoryById } = useAppSelector(selectCategoriesInvariant);
    const scrollableRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const queryArg = {
        subCategoryId: subCategory!._id,
        searchString: searchString || undefined,
        ...filtersToParams(filtersByGroup, categoryById),
        subcategoriesIds: undefined,
    };

    const { recipes, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } =
        recipeApi.usePaginatedRecipesBySubCategoryInfiniteQuery(queryArg, {
            selectFromResult: selectFromRecipeInfiniteQueryResult,
        });

    const lg = useBreakpointValue({ base: false, lg: true });
    const loader = useAppLoader();
    const showLoader = !loader.isRunning() && isFetching && !isFetchingNextPage;
    const appLoaderEnabled = showLoader && (!lg || isAppliedFromDrawerRef.current);

    useUpdateLastSearchResult(recipes);
    useShowAppLoader(appLoaderEnabled);

    const subCategoryIndex = useMemo(
        () => rootCategory.subCategories.indexOf(subCategory),
        [rootCategory, subCategory],
    );

    useEffect(() => {
        const tab = scrollableRef.current?.querySelector<HTMLElement>(
            `[data-index="${subCategoryIndex}"]`,
        );

        if (!tab || !scrollableRef.current) return;

        scrollTabIntoView({
            scrollable: scrollableRef.current,
            tab,
            offset: 300,
            behavior: 'smooth',
        });
    }, [subCategoryIndex]);

    return (
        <Box as='main' py={{ base: 4, lg: 8 }}>
            <VStack justify='center' mb={8} px={{ base: 4, md: 5, lg: 6 }}>
                <Heading fontSize={{ base: '2xl', lg: '5xl' }} mb={4}>
                    {rootCategory.title}
                </Heading>
                <Text
                    fontWeight='medium'
                    color='blackAlpha.600'
                    textAlign='center'
                    maxW={{ base: 'full', lg: '696px' }}
                    fontSize={{ base: 'sm', lg: 'md' }}
                    mb={{ base: 4, lg: 0 }}
                >
                    {rootCategory.description}
                </Text>
                <SearchBar isLoading={showLoader && !appLoaderEnabled} />
            </VStack>
            <Section>
                <Tabs
                    isLazy
                    index={subCategoryIndex}
                    onChange={(index) => {
                        const subcategory = rootCategory.subCategories[index];
                        navigate(`/${rootCategory.category}/${subcategory.category}`);
                    }}
                >
                    <Box
                        ref={scrollableRef}
                        pos='relative'
                        overflowX='auto'
                        sx={{ scrollbarWidth: 'none' }}
                    >
                        <TabList minW='full' w='max-content' border='none'>
                            {rootCategory.subCategories.map((subcategory, i) => (
                                <Tab
                                    key={subcategory._id}
                                    marginBottom={0}
                                    borderBottom='2px solid'
                                    borderColor='chakra-border-color'
                                    data-test-id={`tab-${subcategory.category}-${i}`}
                                >
                                    {subcategory.title}
                                </Tab>
                            ))}
                        </TabList>
                        <TabIndicator key={rootCategory._id} />
                    </Box>
                    <TabPanels>
                        {rootCategory.subCategories.map((subcategory) => (
                            <TabPanel key={subcategory._id}>
                                <SimpleGrid
                                    mb={4}
                                    spacing={{ base: 3, md: 4, '2xl': 6 }}
                                    minChildWidth={{ base: '328px', lg: '668px' }}
                                    autoRows='1fr'
                                >
                                    {recipes
                                        ?.filter((r) =>
                                            isE2E()
                                                ? true
                                                : r.categoriesIds.includes(subcategory._id),
                                        )
                                        .map((r, idx) => (
                                            <RecipeCard
                                                key={r._id}
                                                recipe={r}
                                                variant='horizontal'
                                                recipeLink={buildRecipePath(
                                                    r,
                                                    categoryById,
                                                    activeCategories,
                                                )}
                                                categories={getRecipeRootCategories(
                                                    r,
                                                    categoryById,
                                                )}
                                                renderTitle={(styleProps) => (
                                                    <Heading {...styleProps}>
                                                        <HighlightSearchMatch query={searchString}>
                                                            {r.title}
                                                        </HighlightSearchMatch>
                                                    </Heading>
                                                )}
                                                data-test-id={TestId.recipeCard(idx)}
                                            />
                                        ))}
                                </SimpleGrid>
                                <Center>
                                    {hasNextPage && (
                                        <Button
                                            variant='solid'
                                            bg='lime.400'
                                            size={{ base: 'md', '2xl': 'lg' }}
                                            onClick={fetchNextPage}
                                            data-test-id={TestId.LOAD_MORE_BUTTON}
                                            disabled={isFetchingNextPage}
                                        >
                                            {isFetchingNextPage ? 'Загрузка...' : 'Загрузить еще'}
                                        </Button>
                                    )}
                                </Center>
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </Section>
            <RelevantKitchen key={rootCategory._id} />
        </Box>
    );
}
