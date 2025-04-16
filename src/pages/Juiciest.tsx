import { Box, Center, Heading, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';

import { RecipeCard, recipeCategoryMap } from '~/entities/recipe';
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
                    spacing={{ base: 3, md: 4, '2xl': 6 }}
                    mb={4}
                    minChildWidth={{
                        base: '328px',
                        lg: '668px',
                    }}
                >
                    <RecipeCard
                        variant='horizontal'
                        title='Лапша с курицей и шафраном'
                        category={[recipeCategoryMap['beverages']]}
                        image='/images/лапша-с-курицей.png'
                        description='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                        recommendation={{ name: 'Alex Cook', avatarSrc: '/images/alex.png' }}
                        bookmarks={258}
                        likes={342}
                    />
                    <RecipeCard
                        variant='horizontal'
                        category={[recipeCategoryMap['salads']]}
                        image='/images/том-ям.png'
                        title='Том-ям с капустой кимчи'
                        description='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                        bookmarks={124}
                        likes={324}
                    />
                    <RecipeCard
                        variant='horizontal'
                        category={[recipeCategoryMap['sauces']]}
                        image='/images/пряная-ветчина.png'
                        title='Пряная ветчина по итальянски'
                        description='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                        recommendation={{ name: 'Елена Высоцкая', avatarSrc: '/images/elena.png' }}
                        bookmarks={159}
                        likes={257}
                    />
                    <RecipeCard
                        variant='horizontal'
                        category={[recipeCategoryMap['national']]}
                        image='/images/кнели-со-спагетти.png'
                        title='Кнели со спагетти'
                        description='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                        bookmarks={124}
                        likes={231}
                    />
                    <RecipeCard
                        variant='horizontal'
                        category={[recipeCategoryMap['second-dish']]}
                        image='/images/картошка-тушеная.png'
                        title='Картошка, тушенная с болгарским перцем и фасолью в томатном соусе'
                        description='Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет  мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.'
                        bookmarks={120}
                        likes={180}
                    />
                    <RecipeCard
                        variant='horizontal'
                        category={[recipeCategoryMap['heal-dish']]}
                        image='/images/картофельные-рулетики.png'
                        title='Картофельные рулетики с грибами'
                        description='Рекомендую всем приготовить постное блюдо из картофеля и грибов.  Готовится это блюдо без яиц, без мяса и без сыра, из самых простых  ингредиентов, а получается очень вкусно и сытно. Постный рецепт  картофельных рулетиков с грибами, в томатном соусе, - на обед, ужин и  даже на праздничный стол!'
                        bookmarks={85}
                        likes={180}
                    />
                    <RecipeCard
                        variant='horizontal'
                        category={[recipeCategoryMap['national']]}
                        image='/images/овощная-лазанья.png'
                        title='Овощная лазанья из лаваша'
                        description='Большое, сытное блюдо для ценителей блюд без мяса! Такая лазанья  готовится с овощным соусом и соусом бешамель, а вместо листов для  лазаньи используется тонкий лаваш.'
                        bookmarks={85}
                        likes={152}
                    />
                    <RecipeCard
                        variant='horizontal'
                        category={[recipeCategoryMap['sauces']]}
                        image='/images/тефтели-из-булгура.png'
                        title='Тефтели из булгура и чечевицы, запечённые в томатном соусе'
                        description='Тефтели из булгура и чечевицы – яркие и питательные, отлично подходят  для постного и вегетарианского меню. Тефтели получаются нежными, а также сочными и ароматными благодаря использованию томатного соуса и душистых пряностей.'
                        bookmarks={85}
                        likes={150}
                    />
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
                    <SectionHeading flex={1}>Веганская кухня</SectionHeading>
                    <Text
                        flex={{ base: 2, '2xl': 1 }}
                        fontWeight='medium'
                        color='blackAlpha.700'
                        fontSize={{ base: 'sm', lg: 'md' }}
                    >
                        Интересны не только убеждённым вегетарианцам, но и тем, кто хочет
                        попробовать вегетарианскую диету и готовить вкусные вегетарианские блюда.
                    </Text>
                </Stack>
                <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: 3, lg: 4, '2xl': 6 }}>
                    <RecipeCard
                        variant='no-image'
                        category={[recipeCategoryMap['beverages']]}
                        title='Картошка, тушенная с болгарским перцем и фасолью в томатном соусе'
                        description='Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.'
                        bookmarks={1}
                        likes={1}
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
                        category={[recipeCategoryMap['national']]}
                        title='Капустные котлеты'
                        description='Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.'
                        bookmarks={2}
                        likes={1}
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
                        <RecipeCard
                            variant='compact'
                            category={[recipeCategoryMap['heal-dish']]}
                            title='Стейк для вегетарианцев'
                        />
                        <RecipeCard
                            variant='compact'
                            category={[recipeCategoryMap['salads']]}
                            title='Котлеты из гречки и фасоли'
                        />
                        <RecipeCard
                            variant='compact'
                            category={[recipeCategoryMap['sauces']]}
                            title='Сырный суп с лапшой и брокколи'
                        />
                    </Stack>
                </Stack>
            </Section>
        </Box>
    );
}
