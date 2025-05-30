import { Center, Heading, Spacer, Text, useBreakpointValue, VStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';

import {
    buildCategoryPath,
    selectCategoriesInvariant,
    useActiveCategories,
} from '~/entities/category';
import { recipeApi, selectFromRecipeInfiniteQueryResult } from '~/entities/recipe';
import {
    filtersToParams,
    selectAppliedFiltersByGroup,
    selectIsAppliedFromDrawer,
} from '~/features/filter-recipe';
import { selectAppliedSearchString, useUpdateLastSearchResult } from '~/features/search-recipe';
import { selectIsAppLoaderRunning, useAppLoader } from '~/shared/infra/app-loader';
import { useAppSelector, useAppSelectorRef } from '~/shared/store';
import { TestId } from '~/shared/test-ids';
import { LoadMoreButton } from '~/shared/ui/load-more-button';
import { Main } from '~/shared/ui/main';
import { Section } from '~/shared/ui/section';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '~/shared/ui/tabs';
import { isE2E } from '~/shared/util';
import { RecipeGrid } from '~/widgets/recipe-grid';
import { RelevantKitchen } from '~/widgets/relevant-kitchen';
import { SearchBar } from '~/widgets/search-bar';

export function CategoryPage() {
    const activeCategories = useActiveCategories(true);
    const [rootCategory, subCategory] = activeCategories;
    const isAppliedFromDrawerRef = useAppSelectorRef(selectIsAppliedFromDrawer);
    const searchString = useAppSelector(selectAppliedSearchString);
    const filtersByGroup = useAppSelector(selectAppliedFiltersByGroup);
    const { categoryById } = useAppSelector(selectCategoriesInvariant);
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
    const isAppLoaderRunningRef = useAppSelectorRef(selectIsAppLoaderRunning);
    const showLoader = !isAppLoaderRunningRef.current && isFetching && !isFetchingNextPage;
    const appLoaderEnabled = showLoader && (!lg || isAppliedFromDrawerRef.current);

    useUpdateLastSearchResult(recipes);
    useAppLoader(appLoaderEnabled);

    const subCategoryIndex = useMemo(
        () => rootCategory.subCategories.indexOf(subCategory),
        [rootCategory, subCategory],
    );

    return (
        <Main>
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
                        const subCategory = rootCategory.subCategories[index];
                        navigate(buildCategoryPath(rootCategory, subCategory));
                    }}
                >
                    <TabList centered scrollable indicatorKey={rootCategory._id}>
                        {rootCategory.subCategories.map((sub, idx) => (
                            <Tab
                                key={sub._id}
                                data-test-id={TestId.subCategoryTab(sub.category, idx)}
                            >
                                {sub.title}
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        {rootCategory.subCategories.map((sub) => (
                            <TabPanel key={sub._id}>
                                {recipes && (
                                    <RecipeGrid
                                        mb={4}
                                        searchString={searchString}
                                        activeCategories={activeCategories}
                                        recipes={recipes.filter((recipe) =>
                                            isE2E() ? true : recipe.categoriesIds.includes(sub._id),
                                        )}
                                    />
                                )}
                                <Center>
                                    {hasNextPage && (
                                        <LoadMoreButton
                                            isLoading={isFetchingNextPage}
                                            onClick={fetchNextPage}
                                        />
                                    )}
                                </Center>
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </Section>
            <Spacer />
            <RelevantKitchen key={rootCategory._id} />
        </Main>
    );
}
