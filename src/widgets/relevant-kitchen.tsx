import { chakra, Stack, Text, useConst } from '@chakra-ui/react';
import { sample } from 'lodash-es';
import { memo } from 'react';

import { selectCategoriesInvariant } from '~/entities/category/selectors';
import { RecipeCard } from '~/entities/recipe';
import { recipeApi } from '~/entities/recipe/api';
import { buildRecipePath, getRecipeRootCategories } from '~/entities/recipe/util';
import { useAppSelector } from '~/shared/store';
import { Section, SectionHeading } from '~/shared/ui/section';

import { useAppLoader } from '../shared/infra/app-loader';

export const RelevantKitchen = memo(() => {
    const { categoryById, rootCategories } = useAppSelector(selectCategoriesInvariant);
    const rootCategory = useConst(() => sample(rootCategories));
    const { data: recipes, isLoading } = recipeApi.useRelevantRecipesQuery({
        subCategoriesIds: rootCategory?.subCategories!.map((s) => s._id) ?? [],
        maxRecipes: 5,
    });

    useAppLoader(isLoading);

    return (
        <Section>
            <Stack
                gap={3}
                align={{ base: 'start', lg: 'center' }}
                justify='space-between'
                mb={{ base: 4, lg: 6 }}
                pt={{ base: 2, lg: 6 }}
                borderTopWidth='1px'
                direction={{ base: 'column', lg: 'row' }}
            >
                <SectionHeading flex={1}>{rootCategory?.title}</SectionHeading>
                <Text
                    flex={{ base: 2, '2xl': 1 }}
                    fontWeight='medium'
                    color='blackAlpha.700'
                    fontSize={{ base: 'sm', lg: 'md' }}
                >
                    {rootCategory?.description}
                </Text>
            </Stack>
            <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: 3, lg: 4, '2xl': 6 }}>
                {recipes
                    ?.slice(0, 2)
                    .map((r) => (
                        <RecipeCardStyled
                            key={r._id}
                            variant='no-image'
                            recipe={r}
                            categories={getRecipeRootCategories(r, categoryById)}
                            recipeLink={buildRecipePath(r, categoryById)}
                        />
                    ))}
                <Stack minW={0} flex={{ base: 'auto', md: 1 }} gap={3}>
                    {recipes
                        ?.slice(2)
                        .map((r) => (
                            <RecipeCard
                                key={r._id}
                                recipe={r}
                                variant='compact'
                                categories={getRecipeRootCategories(r, categoryById)}
                                recipeLink={buildRecipePath(r, categoryById)}
                            />
                        ))}
                </Stack>
            </Stack>
        </Section>
    );
});

const RecipeCardStyled = chakra(RecipeCard, {
    baseStyle: {
        flexShrink: 0,
        maxW: {
            base: 'full',
            md: '232px',
            lg: '248px',
            '1.5xl': '282px',
            '2xl': '322px',
        },
    },
});
