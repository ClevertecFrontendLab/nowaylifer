import { Box, Container, Heading, ListItem, OrderedList, Stack } from '@chakra-ui/react';
import { useLoaderData } from 'react-router';

import { blogApi } from '~/entities/blog';
import { selectCategoriesInvariant } from '~/entities/category';
import { getRecipeRootCategories, Recipe, recipeApi, RecipeCard } from '~/entities/recipe';
import { useEditRecipeEventEffect } from '~/features/edit-recipe';
import { useAppLoader } from '~/shared/infra/app-loader';
import { selectSessionDataInvariant } from '~/shared/session/slice';
import { useAppSelector } from '~/shared/store';
import { Main } from '~/shared/ui/main';
import { Section, SectionHeading } from '~/shared/ui/section';
import { NewRecipesSlider } from '~/widgets/new-recipes-slider';

import { OwnRecipeActionButtons, RecipeActionButtons } from './action-buttons';
import { AuthorCard } from './author-card';
import { IngridientTable } from './ingredient-table';
import { NutritionStat } from './nutrition-stat';
import { StepCard } from './step-card';

export function RecipePage() {
    const { userId } = useAppSelector(selectSessionDataInvariant);
    const { categoryById } = useAppSelector(selectCategoriesInvariant);

    const initialRecipe = useLoaderData<Recipe>();
    const { data: recipe = initialRecipe } = recipeApi.useRecipeByIdQuery(initialRecipe._id);

    const { data: blog, isLoading: isBlogLoading } = blogApi.useBlogQuery({
        currentUserId: userId,
        bloggerId: recipe.authorId,
    });

    const isOwnRecipe = recipe.authorId === userId;
    const ActionSlot = isOwnRecipe ? OwnRecipeActionButtons : RecipeActionButtons;

    useEditRecipeEventEffect();

    useAppLoader(isBlogLoading);

    return (
        <Main>
            <RecipeCard
                variant='detailed'
                actionSlot={<ActionSlot recipe={recipe} />}
                categories={getRecipeRootCategories(recipe, categoryById)}
                recipe={recipe}
                mb={{ base: 6, lg: 10 }}
            />
            <Container
                p={0}
                mb={{ base: 10, lg: 14 }}
                maxW={{ base: 'full', lg: '578px', '2xl': '668px' }}
            >
                <Box fontSize='sm' color='blackAlpha.800' mb={{ base: 3, md: 5 }}>
                    * Калорийность на 1 порцию
                </Box>
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    gap={{ base: 3, '2xl': 6 }}
                    mb={{ base: 6, lg: 10 }}
                >
                    <NutritionStat
                        name='калорийность'
                        value={recipe.nutritionValue.calories}
                        measureUnit='ккал'
                    />
                    <NutritionStat name='белки' value={recipe.nutritionValue.protein} />
                    <NutritionStat name='жиры' value={recipe.nutritionValue.fats} />
                    <NutritionStat name='углеводы' value={recipe.nutritionValue.carbohydrates} />
                </Stack>
                <IngridientTable
                    defaultPortions={recipe.portions}
                    ingridients={recipe.ingredients}
                    mb={{ base: 6, lg: 10 }}
                />
                <Box as='section' mb={{ base: 6, lg: 10 }}>
                    <Heading fontWeight='medium' fontSize={{ base: '2xl', lg: '5xl' }} mb={5}>
                        Шаги приготовления
                    </Heading>
                    <OrderedList ml={0} listStyleType='none'>
                        {recipe.steps.map((step) => (
                            <ListItem key={step.stepNumber} _notLast={{ mb: 5 }}>
                                <StepCard
                                    image={step.image}
                                    stepNumber={step.stepNumber}
                                    description={step.description}
                                />
                            </ListItem>
                        ))}
                    </OrderedList>
                </Box>
                {blog && <AuthorCard isSubscribed={blog.isFavorite} author={blog.bloggerInfo} />}
            </Container>
            <Section>
                <SectionHeading mb={{ base: 3, lg: 6 }}>Новые рецепты</SectionHeading>
                <NewRecipesSlider />
            </Section>
        </Main>
    );
}
