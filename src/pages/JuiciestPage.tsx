import { Box, Center, Heading, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';

import { RecipeCard, recipeCategoryMap } from '~/entities/recipe';
import { mockRecipes } from '~/entities/recipe/mock-recipes';
import { Button } from '~/shared/ui/Button';
import { Section, SectionHeading } from '~/shared/ui/Section';
import { SearchBar } from '~/widgets/SearchBar';

export default function JuiciestPage() {
    return (
        <Box as='main' py={{ base: 4, lg: 8 }}>
            <VStack justify='center' mb={8} px={{ base: 4, md: 5, lg: 6 }}>
                <Heading fontSize={{ base: '2xl', lg: '5xl' }} mb={{ base: 4, lg: 8 }}>
                    Самое сочное
                </Heading>
                <Box w='full' maxW='518px'>
                    <SearchBar />
                </Box>
            </VStack>
            <Section>
                <SimpleGrid
                    mb={4}
                    spacing={{ base: 3, md: 4, '2xl': 6 }}
                    minChildWidth={{ base: '328px', lg: '668px' }}
                >
                    <RecipeCard variant='horizontal' recipe={mockRecipes[7]} />
                    <RecipeCard variant='horizontal' recipe={mockRecipes[12]} />
                    <RecipeCard variant='horizontal' recipe={mockRecipes[14]} />
                    <RecipeCard variant='horizontal' recipe={mockRecipes[13]} />
                    <RecipeCard variant='horizontal' recipe={mockRecipes[0]} />
                    <RecipeCard variant='horizontal' recipe={mockRecipes[1]} />
                    <RecipeCard variant='horizontal' recipe={mockRecipes[2]} />
                    <RecipeCard variant='horizontal' recipe={mockRecipes[3]} />
                </SimpleGrid>
                <Center>
                    <Button variant='solid' bg='lime.400' size={{ base: 'md', '2xl': 'lg' }}>
                        Загрузить еще
                    </Button>
                </Center>
            </Section>
            <Section>
                <Stack
                    gap={3}
                    align={{ base: 'start', lg: 'center' }}
                    justify='space-between'
                    mb={{ base: 4, lg: 6 }}
                    pt={{ base: 2, lg: 6 }}
                    borderTopWidth='1px'
                    borderColor='blackAlpha.200'
                    direction={{ base: 'column', lg: 'row' }}
                >
                    <SectionHeading flex={1}>{recipeCategoryMap.vegan.label}</SectionHeading>
                    <Text
                        flex={{ base: 2, '2xl': 1 }}
                        fontWeight='medium'
                        color='blackAlpha.700'
                        fontSize={{ base: 'sm', lg: 'md' }}
                    >
                        {recipeCategoryMap.vegan.description}
                    </Text>
                </Stack>
                <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: 3, lg: 4, '2xl': 6 }}>
                    <RecipeCard
                        variant='no-image'
                        recipe={mockRecipes[0]}
                        flexShrink={0}
                        maxW={{
                            base: 'full',
                            md: '232px',
                            lg: '248px',
                            '1.5xl': '282px',
                            '2xl': '322px',
                        }}
                    />
                    <RecipeCard
                        variant='no-image'
                        recipe={mockRecipes[5]}
                        flexShrink={0}
                        maxW={{
                            base: 'full',
                            md: '232px',
                            lg: '248px',
                            '1.5xl': '282px',
                            '2xl': '322px',
                        }}
                    />
                    <Stack minW={0} flex={{ base: 'auto', md: 1 }} gap={3}>
                        <RecipeCard variant='compact' recipe={mockRecipes[16]} />
                        <RecipeCard variant='compact' recipe={mockRecipes[17]} />
                        <RecipeCard variant='compact' recipe={mockRecipes[18]} />
                    </Stack>
                </Stack>
            </Section>
        </Box>
    );
}
