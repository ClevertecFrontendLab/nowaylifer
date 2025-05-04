import { Box, Center, Heading, SimpleGrid, useBreakpointValue, VStack } from '@chakra-ui/react';

import { selectCategoriesInvariant } from '~/entities/category';
import {
    buildRecipeLink,
    getRecipeRootCategories,
    recipeApi,
    RecipeCard,
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
import { useAppSelector, useAppSelectorRef } from '~/shared/store';
import { TestId } from '~/shared/test-ids';
import { Button } from '~/shared/ui/Button';
import { Section } from '~/shared/ui/Section';
import { useShowAppLoader } from '~/widgets/app-loader';
import { SearchBar } from '~/widgets/SearchBar';

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
        <Box as='main' py={{ base: 4, lg: 8 }}>
            <VStack justify='center' mb={8} px={{ base: 4, md: 5, lg: 6 }}>
                <Heading fontSize={{ base: '2xl', lg: '5xl' }} mb={{ base: 4, lg: 8 }}>
                    Самое сочное
                </Heading>
                <SearchBar isLoading={showLoader && !appLoaderEnabled} />
            </VStack>
            <Section>
                <SimpleGrid
                    mb={4}
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
                </SimpleGrid>
                <Center>
                    {hasNextPage && (
                        <Button
                            variant='solid'
                            bg='lime.400'
                            size={{ base: 'md', '2xl': 'lg' }}
                            onClick={fetchNextPage}
                            data-test-id={TestId.LOAD_MORE_BUTTON}
                        >
                            {isFetchingNextPage ? 'Загрузка...' : 'Загрузить еще'}
                        </Button>
                    )}
                </Center>
            </Section>
        </Box>
    );
}
