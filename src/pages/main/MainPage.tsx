import { Box, Center, Heading, SimpleGrid, useBreakpointValue, VStack } from '@chakra-ui/react';

import { selectCategoriesInvariant } from '~/entities/category/selectors';
import { RecipeCard } from '~/entities/recipe';
import { recipeApi, selectFromRecipeInfiniteQueryResult } from '~/entities/recipe/api';
import { buildRecipeLink, getRecipeRootCategories } from '~/entities/recipe/util';
import { filtersToParams } from '~/features/filter-recipe/filters-to-params';
import {
    selectAppliedFiltersByGroup,
    selectIsAppliedFromDrawer,
} from '~/features/filter-recipe/slice';
import { HighlightSearchMatch, useUpdateLastSearchResult } from '~/features/search-recipe';
import { selectAppliedSearchString } from '~/features/search-recipe/slice';
import { useAppSelector, useAppSelectorRef } from '~/shared/store';
import { TestId } from '~/shared/test-ids';
import { Button } from '~/shared/ui/Button';
import { Section, SectionHeading } from '~/shared/ui/Section';
import { useShowAppLoader } from '~/widgets/app-loader';
import { NewRecipesSlider } from '~/widgets/NewRecipesSlider';
import { RelevantKitchen } from '~/widgets/RelevantKitchen';
import { SearchBar } from '~/widgets/SearchBar';

import { BlogsSection } from './BlogsSection';
import { JuiciestSection } from './JuiciestSection';

export function MainPage() {
    const searchString = useAppSelector(selectAppliedSearchString);
    const filtersByGroup = useAppSelector(selectAppliedFiltersByGroup);
    const isAppliedFromDrawerRef = useAppSelectorRef(selectIsAppliedFromDrawer);
    const { categoryById } = useAppSelector(selectCategoriesInvariant);

    const shouldFetchRecipes = !!searchString || !!Object.keys(filtersByGroup).length;

    const queryArg = {
        searchString: searchString || undefined,
        ...filtersToParams(filtersByGroup, categoryById),
    };

    const { recipes, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } =
        recipeApi.usePaginatedRecipesInfiniteQuery(queryArg, {
            skip: !shouldFetchRecipes,
            selectFromResult: selectFromRecipeInfiniteQueryResult,
        });

    const lg = useBreakpointValue({ base: false, lg: true });
    const showAllRecipes = shouldFetchRecipes && !!recipes?.length;
    const showLoader = isFetching && !isFetchingNextPage;
    const appLoaderEnabled = showLoader && (!lg || isAppliedFromDrawerRef.current);

    useUpdateLastSearchResult(recipes);
    useShowAppLoader(appLoaderEnabled);

    return (
        <Box as='main' py={{ base: 4, lg: 8 }}>
            <VStack
                gap={2.5}
                justify='center'
                mb={{ base: 8, lg: 14 }}
                px={{ base: 4, md: 5, lg: 6 }}
            >
                <Heading fontSize={{ base: '2xl', lg: '5xl' }} mb={{ base: 4, lg: 0 }}>
                    Приятного аппетита!
                </Heading>
                <SearchBar isLoading={showLoader && !appLoaderEnabled} />
            </VStack>
            {showAllRecipes && (
                <Box>
                    <SimpleGrid
                        mb={4}
                        spacing={{ base: 3, md: 4, '2xl': 6 }}
                        minChildWidth={{ base: '328px', lg: '668px' }}
                        autoRows='1fr'
                    >
                        {recipes?.map((r, idx) => (
                            <RecipeCard
                                key={r._id}
                                recipe={r}
                                variant='horizontal'
                                categories={getRecipeRootCategories(r, categoryById)}
                                recipeLink={buildRecipeLink(r, categoryById)}
                                testId={{ root: TestId.recipeCard(idx) }}
                                renderTitle={(styleProps) => (
                                    <Heading {...styleProps}>
                                        <HighlightSearchMatch query={searchString}>
                                            {r.title}
                                        </HighlightSearchMatch>
                                    </Heading>
                                )}
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
                                disabled={isFetchingNextPage}
                                data-test-id={TestId.LOAD_MORE_BUTTON}
                            >
                                {isFetchingNextPage ? 'Загрузка...' : 'Загрузить еще'}
                            </Button>
                        )}
                    </Center>
                </Box>
            )}
            {!showAllRecipes && (
                <>
                    <Section>
                        <SectionHeading mb={6}>Новые рецепты</SectionHeading>
                        <NewRecipesSlider />
                    </Section>
                    <JuiciestSection />
                    <BlogsSection />
                    <RelevantKitchen />
                </>
            )}
        </Box>
    );
}
