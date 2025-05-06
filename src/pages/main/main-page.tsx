import { Box, Center, Heading, useBreakpointValue, VStack } from '@chakra-ui/react';

import { selectCategoriesInvariant } from '~/entities/category/selectors';
import { RecipeCard, RecipeCardsGrid } from '~/entities/recipe';
import { recipeApi, selectFromRecipeInfiniteQueryResult } from '~/entities/recipe/api';
import { buildRecipePath, getRecipeRootCategories } from '~/entities/recipe/util';
import { filtersToParams } from '~/features/filter-recipe/filters-to-params';
import {
    selectAppliedFiltersByGroup,
    selectIsAppliedFromDrawer,
} from '~/features/filter-recipe/slice';
import { HighlightSearchMatch, useUpdateLastSearchResult } from '~/features/search-recipe';
import { selectAppliedSearchString } from '~/features/search-recipe/slice';
import { useAppSelector, useAppSelectorRef } from '~/shared/store';
import { TestId } from '~/shared/test-ids';
import { Button } from '~/shared/ui/button';
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
