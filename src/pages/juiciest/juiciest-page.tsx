import { Center, Heading, useBreakpointValue, VStack } from '@chakra-ui/react';

import { selectCategoriesInvariant } from '~/entities/category';
import {
    recipeApi,
    RecipeRequestParams,
    selectFromRecipeInfiniteQueryResult,
} from '~/entities/recipe';
import {
    filtersToParams,
    selectAppliedFiltersByGroup,
    selectIsAppliedFromDrawer,
} from '~/features/filter-recipe';
import { selectSearchString, useUpdateLastSearchResult } from '~/features/search-recipe';
import { useAppLoader } from '~/shared/infra/app-loader';
import { useAppSelector, useAppSelectorRef } from '~/shared/store';
import { LoadMoreButton } from '~/shared/ui/load-more-button';
import { Main } from '~/shared/ui/main';
import { Section } from '~/shared/ui/section';
import { RecipeGrid } from '~/widgets/recipe-grid';
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
    useAppLoader(appLoaderEnabled);

    return (
        <Main>
            <VStack justify='center' mb={8} px={{ base: 4, md: 5, lg: 6 }}>
                <Heading fontSize={{ base: '2xl', lg: '5xl' }} mb={{ base: 4, lg: 8 }}>
                    Самое сочное
                </Heading>
                <SearchBar isLoading={showLoader && !appLoaderEnabled} />
            </VStack>
            <Section>
                {recipes && <RecipeGrid mb={4} searchString={searchString} recipes={recipes} />}
                <Center>
                    {hasNextPage && (
                        <LoadMoreButton isLoading={isFetchingNextPage} onClick={fetchNextPage} />
                    )}
                </Center>
            </Section>
        </Main>
    );
}
