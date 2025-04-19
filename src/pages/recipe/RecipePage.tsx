import { Box, Container, Heading, ListItem, OrderedList, Stack } from '@chakra-ui/react';

import { RecipeCard } from '~/entities/recipe';
import { mockRecipes } from '~/entities/recipe/mock-recipes';
import { RecipeSlider } from '~/widgets/RecipeSlider';

import { AuthorCard } from './AuthorCard';
import { IngridientTable } from './IngridientTable';
import { NutritionStat } from './NutritionStat';
import { StepCard } from './StepCard';

export default function RecipePage() {
    const recipe = mockRecipes[3];
    return (
        <Box as='main' py={{ base: 4, lg: 8 }}>
            <RecipeCard variant='detailed' recipe={recipe} mb={{ base: 6, lg: 10 }} />
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
                    <NutritionStat name='белки' value={recipe.nutritionValue.proteins} />
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
                <AuthorCard
                    avatar='/images/sergey.png'
                    displayName='Сергей Разумов'
                    username='@serge25'
                    friends={125}
                />
            </Container>
            <Box as='section'>
                <Heading
                    fontWeight='medium'
                    fontSize={{ base: '2xl', lg: '4xl', '2xl': '5xl' }}
                    mb={{ base: 3, lg: 6 }}
                >
                    Новые рецепты
                </Heading>
                <RecipeSlider
                    recipes={[...mockRecipes]
                        .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
                        .slice(0, 10)}
                />
            </Box>
        </Box>
    );
}
