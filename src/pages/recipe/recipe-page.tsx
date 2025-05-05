import { Box, Container, Heading, ListItem, OrderedList, Stack } from '@chakra-ui/react';
import { useLoaderData } from 'react-router';

import { selectCategoriesInvariant } from '~/entities/category/selectors';
import { RecipeCard } from '~/entities/recipe';
import { recipeApi } from '~/entities/recipe/api';
import { RecipeWithAuthor } from '~/entities/recipe/interface';
import { getRecipeRootCategories } from '~/entities/recipe/util';
import { useAppSelector } from '~/shared/store';
import { Section, SectionHeading } from '~/shared/ui/section';
import { buildImageSrc } from '~/shared/util';
import { NewRecipesSlider } from '~/widgets/new-recipes-slider';

import { AuthorCard } from './author-card';
import { IngridientTable } from './ingredient-table';
import { NutritionStat } from './nutrition-stat';
import { StepCard } from './step-card';

export function RecipePage() {
    const initialRecipe = useLoaderData<RecipeWithAuthor>();
    const { data } = recipeApi.useRecipeByIdQuery(initialRecipe._id);
    const { categoryById } = useAppSelector(selectCategoriesInvariant);
    const recipe = data ?? initialRecipe;

    return (
        <Box as='main' py={{ base: 4, lg: 8 }}>
            <RecipeCard
                variant='detailed'
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
                                    image={buildImageSrc(step.image)}
                                    stepNumber={step.stepNumber}
                                    description={step.description}
                                />
                            </ListItem>
                        ))}
                    </OrderedList>
                </Box>
                {recipe.authorData && <AuthorCard author={recipe.authorData} />}
            </Container>
            <Section>
                <SectionHeading mb={{ base: 3, lg: 6 }}>Новые рецепты</SectionHeading>
                <NewRecipesSlider />
            </Section>
        </Box>
    );
}
