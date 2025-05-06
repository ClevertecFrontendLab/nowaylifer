import { Box, Center, Heading, useBreakpointValue, VStack } from '@chakra-ui/react';

import { selectCategoriesInvariant } from '~/entities/category';
import {
    buildRecipePath,
    getRecipeRootCategories,
    recipeApi,
    RecipeCard,
    RecipeCardsGrid,
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
import { LoadMoreButton } from '~/shared/ui/load-more-button';
import { Main } from '~/shared/ui/main';
import { Section, SectionHeading } from '~/shared/ui/section';
import { useShowAppLoader } from '~/widgets/app-loader';
import { NewRecipesSlider } from '~/widgets/new-recipes-slider';
import { RelevantKitchen } from '~/widgets/relevant-kitchen';
import { SearchBar } from '~/widgets/search-bar';

import { BlogsSection } from './blogs-section';
import { JuiciestSection } from './juiciest-section';

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
                    <RecipeCardsGrid mb={4}>
                        {recipes?.map((r, idx) => (
                            <RecipeCard
                                key={r._id}
                                recipe={r}
                                variant='horizontal'
                                categories={getRecipeRootCategories(r, categoryById)}
                                recipeLink={buildRecipePath(r, categoryById)}
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
                    </RecipeCardsGrid>
                    <Center>
                        {hasNextPage && (
                            <LoadMoreButton
                                isLoading={isFetchingNextPage}
                                onClick={fetchNextPage}
                            />
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
