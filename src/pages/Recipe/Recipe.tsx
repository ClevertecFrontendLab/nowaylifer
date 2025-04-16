import { Box, Container, Heading, ListItem, OrderedList, Stack } from '@chakra-ui/react';

import { RecipeCard, recipeCategoryMap } from '~/entities/recipe';
import { mockRecipes } from '~/entities/recipe/mock-recipes';

import { AuthorCard } from './AuthorCard';
import { IngridientTable } from './IngridientTable';
import { NutritionStat } from './NutritionStat';
import { StepCard } from './StepCard';

export default function RecipePage() {
    const recipe = mockRecipes[3];
    return (
        <Box as='main' py={{ base: 4, lg: 8 }}>
            <RecipeCard
                variant='detailed'
                category={recipe.category.map((c) => recipeCategoryMap[c])}
                title={recipe.title}
                time={recipe.time}
                image={recipe.image}
                description={recipe.description}
                bookmarks={recipe.bookmarks}
                likes={recipe.likes}
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
        </Box>
    );
}
