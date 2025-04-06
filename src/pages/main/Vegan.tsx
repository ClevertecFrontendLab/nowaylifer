import {
    Box,
    Center,
    Heading,
    SimpleGrid,
    Stack,
    Tab,
    TabIndicator,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack,
} from '@chakra-ui/react';

import { foodMenu } from '~/shared/constants/food-menu';
import { Button } from '~/shared/ui/Button';
import { DishCard } from '~/shared/ui/DishCard';
import { Section, SectionHeading } from '~/shared/ui/Section';
import { SearchBar } from '~/widgets/SearchBar';

export default function VeganPage() {
    return (
        <Box as='main' py={{ base: 4, lg: 8 }}>
            <VStack justify='center' mb={8} px={{ base: 4, md: 5, lg: 6 }}>
                <Heading fontSize={{ base: '2xl', lg: '5xl' }} mb={4}>
                    Веганская кухня
                </Heading>
                <Text
                    fontWeight='medium'
                    color='blackAlpha.600'
                    maxW='696px'
                    fontSize={{ base: 'sm', lg: 'md' }}
                    mb={{ base: 4, lg: 8 }}
                >
                    Интересны не только убеждённым вегетарианцам, но и тем, кто хочет попробовать
                    вегетарианскую диету и готовить вкусные вегетарианские блюда.
                </Text>
                <Box w='full' maxW='518px'>
                    <SearchBar />
                </Box>
            </VStack>
            <Section>
                <Tabs defaultIndex={2}>
                    <Box pos='relative' overflowX='auto' sx={{ scrollbarWidth: 'none' }}>
                        <TabList border='none'>
                            {foodMenu[6].subcategories.map((entry) => (
                                <Tab
                                    key={entry.label}
                                    marginBottom={0}
                                    borderBottom='2px solid'
                                    borderColor='chakra-border-color'
                                >
                                    {entry.label}
                                </Tab>
                            ))}
                        </TabList>
                        <TabIndicator />
                    </Box>
                    <TabPanels>
                        <TabPanel></TabPanel>
                        <TabPanel></TabPanel>
                        <TabPanel>
                            <SimpleGrid
                                spacing={{ base: 3, md: 4, '2xl': 6 }}
                                mb={4}
                                minChildWidth={{
                                    base: '328px',
                                    lg: '668px',
                                }}
                            >
                                <DishCard
                                    variant='horizontal'
                                    title='Картошка, тушенная с болгарским перцем и фасолью в томатном соусе'
                                    category={foodMenu[9].category}
                                    imgSrc='/images/картошка-тушеная.png'
                                    description='Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет  мясо, делая рагу сытным и питательным. Чтобы сократить время  приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт  добавления томатной пасты.'
                                    bookmarks={85}
                                    likes={152}
                                />
                                <DishCard
                                    variant='horizontal'
                                    category={foodMenu[7].category}
                                    imgSrc='/images/картофельные-рулетики.png'
                                    title='Картофельные рулетики с грибами'
                                    description='Рекомендую всем приготовить постное блюдо из картофеля и грибов.  Готовится это блюдо без яиц, без мяса и без сыра, из самых простых  ингредиентов, а получается очень вкусно и сытно. Постный рецепт  картофельных рулетиков с грибами, в томатном соусе, - на обед, ужин и  даже на праздничный стол!'
                                    bookmarks={85}
                                    likes={152}
                                />
                                <DishCard
                                    variant='horizontal'
                                    category={foodMenu[9].category}
                                    imgSrc='/images/том-ям.png'
                                    title='Том-ям с капустой кимчи'
                                    description='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                                    bookmarks={124}
                                    likes={324}
                                />
                                <DishCard
                                    variant='horizontal'
                                    category={foodMenu[5].category}
                                    imgSrc='/images/овощная-лазанья.png'
                                    title='Овощная лазанья из лаваша'
                                    description='Большое, сытное блюдо для ценителей блюд без мяса! Такая лазанья  готовится с овощным соусом и соусом бешамель, а вместо листов для  лазаньи используется тонкий лаваш.'
                                    bookmarks={85}
                                    likes={152}
                                />
                                <DishCard
                                    variant='horizontal'
                                    category={foodMenu[3].category}
                                    imgSrc='/images/тефтели-из-булгура.png'
                                    title='Тефтели из булгура и чечевицы, запечённые в томатном соусе'
                                    description='Тефтели из булгура и чечевицы – яркие и питательные, отлично подходят  для постного и вегетарианского меню. Тефтели получаются нежными, а также сочными и ароматными благодаря использованию томатного соуса и душистых пряностей.'
                                    bookmarks={85}
                                    likes={152}
                                />
                                <DishCard
                                    variant='horizontal'
                                    category={foodMenu[3].category}
                                    imgSrc='/images/тефтели-из-булгура.png'
                                    title='Тефтели из булгура и чечевицы, запечённые в томатном соусе'
                                    description='Тефтели из булгура и чечевицы – яркие и питательные, отлично подходят  для постного и вегетарианского меню. Тефтели получаются нежными, а также сочными и ароматными благодаря использованию томатного соуса и душистых пряностей.'
                                    bookmarks={85}
                                    likes={152}
                                />
                                <DishCard
                                    variant='horizontal'
                                    category={foodMenu[9].category}
                                    imgSrc='/images/чесночная-картошка.png'
                                    title='Чесночная картошка'
                                    description='Такая картошечка украсит любой семейный обед! Все будут в полном  восторге, очень вкусно! Аромат чеснока, хрустящая корочка на картошечке - просто объедение! Отличная идея для обеда или ужина, готовится просто!'
                                    bookmarks={124}
                                    likes={324}
                                />
                                <DishCard
                                    variant='horizontal'
                                    category={foodMenu[9].category}
                                    imgSrc='/images/пури.png'
                                    title='Пури'
                                    description='Пури - это индийские жареные лепешки, которые готовятся из пресного  теста. Рецепт лепешек пури требует самых доступных ингредиентов, и  времени на приготовление хрустящих лепешек уйдет мало.'
                                    bookmarks={124}
                                    likes={324}
                                />
                            </SimpleGrid>
                            <Center>
                                <Button
                                    variant='solid'
                                    bg='lime.400'
                                    size={{ base: 'md', '2xl': 'lg' }}
                                >
                                    Загрузить еще
                                </Button>
                            </Center>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Section>
            <Section borderTop='1px' borderColor='blackAlpha.200' pt={{ base: 2, lg: 6 }}>
                <Stack
                    gap={3}
                    align={{ base: 'start', lg: 'center' }}
                    justify='space-between'
                    mb={{ base: 4, lg: 6 }}
                    direction={{ base: 'column', lg: 'row' }}
                >
                    <SectionHeading flex={1}>Десерты, выпечка</SectionHeading>
                    <Text
                        flex={1}
                        fontWeight='medium'
                        color='blackAlpha.700'
                        fontSize={{ base: 'sm', lg: 'md' }}
                    >
                        Без них невозможно представить себе ни современную, ни традиционную
                        кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб -
                        рецепты изделий из теста многообразны и невероятно популярны.
                    </Text>
                </Stack>
                <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: 3, lg: 4, '2xl': 6 }}>
                    <DishCard
                        variant='no-image'
                        category={foodMenu[7].category}
                        title='Бананово-молочное желе'
                        description='Молочное желе – это просто, вкусно и полезно, ведь для его приготовления в качестве основы используется молоко.'
                        bookmarks={1}
                        likes={1}
                        flex={{ base: 'auto', md: 1 }}
                        maxW={{ base: 'none', md: '232px', xl: '282px', '2xl': '322px' }}
                    />
                    <DishCard
                        variant='no-image'
                        category={foodMenu[7].category}
                        title='Нежный сливочно-сырный крем для кексов'
                        description='Сливочно-сырным кремом можно украсить кексы, либо другую выпечку, а также этим кремом можно наполнить заварные пирожные.'
                        bookmarks={2}
                        likes={1}
                        flex={{ base: 'auto', md: 1 }}
                        maxW={{ base: 'none', md: '232px', xl: '282px', '2xl': '322px' }}
                    />
                    <Stack flex={{ base: 'auto', md: 1 }} gap={3}>
                        <DishCard
                            variant='compact'
                            category={foodMenu[7].category}
                            title='Домашние сырные палочки'
                        />
                        <DishCard
                            variant='compact'
                            category={foodMenu[9].category}
                            title='Панкейки'
                        />
                        <DishCard
                            variant='compact'
                            category={foodMenu[6].category}
                            title='Воздушное банановое печенье на сковороде'
                        />
                    </Stack>
                </Stack>
            </Section>
        </Box>
    );
}
