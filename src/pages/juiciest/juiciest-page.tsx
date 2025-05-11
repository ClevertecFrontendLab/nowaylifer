import { Center, Heading, useBreakpointValue, VStack } from '@chakra-ui/react';

import { selectCategoriesInvariant } from '~/entities/category';
import {
    buildRecipePath,
    getRecipeRootCategories,
    recipeApi,
    RecipeCard,
    RecipeCardsGrid,
    RecipeRequestParams,
    selectFromRecipeInfiniteQueryResult,
} from '~/entities/recipe';
import {
    filtersToParams,
    selectAppliedFiltersByGroup,
    selectIsAppliedFromDrawer,
} from '~/features/filter-recipe';
import {
    HighlightSearchMatch,
    selectSearchString,
    useUpdateLastSearchResult,
} from '~/features/search-recipe';
import { useShowAppLoader } from '~/shared/infra/app-loader';
import { useAppSelector, useAppSelectorRef } from '~/shared/store';
import { TestId } from '~/shared/test-ids';
import { LoadMoreButton } from '~/shared/ui/load-more-button';
import { Main } from '~/shared/ui/main';
import { Section } from '~/shared/ui/section';
import { SearchBar } from '~/widgets/search-bar';

export function JuiciestPage() {
    const searchString = useAppSelector(selectSearchString);
    const filtersByGroup = useAppSelector(selectAppliedFiltersByGroup);
    const isAppliedFromDrawerRef = useAppSelectorRef(selectIsAppliedFromDrawer);
    const { categoryById } = useAppSelector(selectCategoriesInvariant);

    const queryArg: RecipeRequestParams = {
        searchString: searchString || undefined,
        ...filtersToParams(filtersByGroup, categoryById),
        sortBy: 'likes',
        sortOrder: 'desc',
    };

    const { recipes, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } =
        recipeApi.usePaginatedRecipesInfiniteQuery(queryArg, {
            selectFromResult: selectFromRecipeInfiniteQueryResult,
        });

    const lg = useBreakpointValue({ base: false, lg: true });
    const showLoader = isFetching && !isFetchingNextPage;
    const appLoaderEnabled = showLoader && (!lg || isAppliedFromDrawerRef.current);

    useUpdateLastSearchResult(recipes);
    useShowAppLoader(appLoaderEnabled);

    return (
        <Main>
            <VStack justify='center' mb={8} px={{ base: 4, md: 5, lg: 6 }}>
                <Heading fontSize={{ base: '2xl', lg: '5xl' }} mb={{ base: 4, lg: 8 }}>
                    Самое сочное
                </Heading>
                <SearchBar isLoading={showLoader && !appLoaderEnabled} />
            </VStack>
            <Section>
                <RecipeCardsGrid mb={4}>
                    {recipes?.map((r, idx) => (
                        <RecipeCard
                            key={r._id}
                            recipe={r}
                            variant='horizontal'
                            categories={getRecipeRootCategories(r, categoryById)}
                            recipeLink={buildRecipePath(r, categoryById)}
                            data-test-id={TestId.recipeCard(idx)}
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
                        <LoadMoreButton isLoading={isFetchingNextPage} onClick={fetchNextPage} />
                    )}
                </Center>
            </Section>
        </Main>
    );
}
