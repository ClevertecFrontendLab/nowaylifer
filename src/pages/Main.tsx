import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import {
    Box,
    Center,
    Flex,
    Heading,
    HStack,
    IconButton,
    IconButtonProps,
    SimpleGrid,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react';

import { RecipeCard, recipeCategoryMap } from '~/entities/recipe';
import { BlogCard } from '~/shared/ui/BlogCard';
import { Button } from '~/shared/ui/Button';
import { Link } from '~/shared/ui/Link';
import { RecipeCard } from '~/shared/ui/RecipeCard';
import { Section, SectionHeading } from '~/shared/ui/Section';
import { SearchBar } from '~/widgets/SearchBar';

const SliderLeftControlButton = (props: Omit<IconButtonProps, 'aria-label'>) => (
    <IconButton
        size='lg'
        bg='black'
        color='lime.50'
        zIndex={1}
        transition='none'
        aria-label='Slide left'
        icon={<ArrowBackIcon boxSize={6} />}
        {...props}
    />
);

const SliderRightControlButton = (props: Omit<IconButtonProps, 'aria-label'>) => (
    <IconButton
        size='lg'
        bg='black'
        color='lime.50'
        zIndex={1}
        transition='none'
        aria-label='Slide right'
        icon={<ArrowForwardIcon boxSize={6} />}
        {...props}
    />
);

export default function MainPage() {
    return (
        <Box as='main' py={{ base: 4, lg: 8 }}>
            <VStack justify='center' mb={{ base: 8, lg: '58px' }} px={{ base: 4, md: 5, lg: 6 }}>
                <Heading fontSize={{ base: '2xl', lg: '5xl' }} mb={{ base: 4, lg: 8 }}>
                    Приятного аппетита!
                </Heading>
                <Box w='full' maxW='518px'>
                    <SearchBar />
                </Box>
            </VStack>
            <Section>
                <SectionHeading mb={6}>Новые рецепты</SectionHeading>
                <Box pos='relative'>
                    <SliderLeftControlButton hideBelow='lg' pos='absolute' left={-2} top='35%' />
                    <SliderRightControlButton hideBelow='lg' pos='absolute' right={-2} top='35%' />
                    <Box overflowX='hidden'>
                        <Flex gap={{ base: 3, '2xl': 6 }}>
                            <RecipeCard
                                variant='vertical'
                                title='Солянка с грибами'
                                description='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                                image='/images/солянка-с-грибами.png'
                                category={[foodMenu[2].category]}
                                bookmarks={1}
                                flexShrink={0}
                            />
                            <RecipeCard
                                variant='vertical'
                                title='Капустные котлеты'
                                description='Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных  блюд.'
                                image='/images/капустные-котлеты.png'
                                category={[foodMenu[6].category]}
                                bookmarks={2}
                                likes={1}
                                flexShrink={0}
                            />
                            <RecipeCard
                                variant='vertical'
                                title={<>Оладьи на кефире&nbsp;"Пышные"</>}
                                description='Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.'
                                image='/images/оладьи-пышные.png'
                                category={[foodMenu[4].category]}
                                likes={1}
                                flexShrink={0}
                            />
                            <RecipeCard
                                variant='vertical'
                                title='Салат "Здоровье"'
                                description='Сельдерей очень полезен для здоровья, пора набираться витаминов. Не  салат, а сплошное удовольствие:) Вкусный, необычный, а главное быстрый.'
                                image='/images/салат-здоровье.png'
                                category={[foodMenu[0].category]}
                                flexShrink={0}
                            />
                        </Flex>
                    </Box>
                </Box>
            </Section>
            <Section>
                <HStack justify='space-between' mb={6}>
                    <SectionHeading>Самое сочное</SectionHeading>
                    <Button
                        as={Link}
                        to='/juiciest'
                        hideBelow='lg'
                        variant='solid'
                        bg='lime.400'
                        data-test-id='juiciest-link'
                        rightIcon={<ArrowForwardIcon />}
                        size={{ base: 'md', '2xl': 'lg' }}
                    >
                        Вся подборка
                    </Button>
                </HStack>
                <SimpleGrid
                    spacing={{ base: 3, md: 4, '2xl': 6 }}
                    mb={{ base: 3, lg: 0 }}
                    minChildWidth={{
                        base: '328px',
                        lg: '668px',
                    }}
                >
                    <RecipeCard
                        variant='horizontal'
                        title='Кнели со спагетти'
                        category={[recipeCategoryMap['beverages']]}
                        image='/images/кнели-со-спагетти.png'
                        description='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                        bookmarks={85}
                        likes={152}
                    />
                    <RecipeCard
                        variant='horizontal'
                        category={[recipeCategoryMap['desserts-pastry']]}
                        image='/images/пряная-ветчина.png'
                        title='Пряная ветчина по итальянски'
                        description='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                        recommendation={{ name: 'Елена Высоцкая', avatarSrc: '/images/elena.png' }}
                        bookmarks={159}
                        likes={257}
                    />
                    <RecipeCard
                        variant='horizontal'
                        category={[recipeCategoryMap['first-dish']]}
                        image='/images/лапша-с-курицей.png'
                        title='Лапша с курицей и шафраном'
                        description='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                        recommendation={{ name: 'Alex Cook', avatarSrc: '/images/alex.png' }}
                        bookmarks={258}
                        likes={342}
                    />
                    <RecipeCard
                        variant='horizontal'
                        category={[recipeCategoryMap['first-dish']]}
                        image='/images/том-ям.png'
                        title='Том-ям с капустой кимчи'
                        description='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                        bookmarks={124}
                        likes={324}
                    />
                </SimpleGrid>
                <Center hideFrom='lg'>
                    <Button
                        as={Link}
                        to='/juicied'
                        variant='solid'
                        bg='lime.400'
                        data-test-id='juiciest-link-mobile'
                        rightIcon={<ArrowForwardIcon />}
                        size={{ base: 'md', '2xl': 'lg' }}
                    >
                        Вся подборка
                    </Button>
                </Center>
            </Section>
            <Section>
                <Box bg='lime.300' borderRadius='2xl' p={{ base: 3, lg: 6 }}>
                    <HStack
                        align='center'
                        justify='space-between'
                        mb={{ base: 3, lg: 5, '2xl': 8 }}
                    >
                        <Heading
                            fontSize={{ base: '2xl', lg: '3xl', '2xl': '4xl' }}
                            fontWeight='medium'
                        >
                            Кулинарные блоги
                        </Heading>
                        <Button
                            hideBelow='lg'
                            variant='ghost'
                            size={{ base: 'md', '2xl': 'lg' }}
                            rightIcon={<ArrowForwardIcon />}
                        >
                            Все авторы
                        </Button>
                    </HStack>
                    <SimpleGrid
                        columns={{ base: 1, md: 3 }}
                        spacing={{ base: 3, lg: 4 }}
                        mb={{ base: 3, lg: 0 }}
                    >
                        <BlogCard
                            content='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                            author={{
                                displayName: 'Елена Высоцкая',
                                username: '@elenapovar',
                                avatarSrc: '/images/elena.png',
                            }}
                        />
                        <BlogCard
                            content='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                            author={{
                                displayName: 'Alex Cook',
                                username: '@funtasticooking',
                                avatarSrc: '/images/alex.png',
                            }}
                        />
                        <BlogCard
                            content='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                            author={{
                                displayName: 'Екатерина Константинопольская',
                                username: '@bake_and_pie',
                                avatarSrc: '/images/ekaterina.png',
                            }}
                        />
                    </SimpleGrid>
                    <Center hideFrom='lg'>
                        <Button
                            variant='ghost'
                            size={{ base: 'md', '2xl': 'lg' }}
                            rightIcon={<ArrowForwardIcon />}
                        >
                            Все авторы
                        </Button>
                    </Center>
                </Box>
            </Section>
            <Section>
                <Stack
                    gap={3}
                    pt={{ base: 2, lg: 6 }}
                    borderTopWidth='1px'
                    borderColor='blackAlpha.200'
                    align={{ base: 'start', lg: 'center' }}
                    justify='space-between'
                    mb={{ base: 4, lg: 6 }}
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
                        category={[recipeCategoryMap['child-dish']]}
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
                            category={[recipeCategoryMap['beverages']]}
                            title='Стейк для вегетарианцев'
                        />
                        <RecipeCard
                            variant='compact'
                            category={[recipeCategoryMap['child-dish']]}
                            title='Котлеты из гречки и фасоли'
                        />
                        <RecipeCard
                            variant='compact'
                            category={[recipeCategoryMap['child-dish']]}
                            title='Сырный суп с лапшой и брокколи'
                        />
                    </Stack>
                </Stack>
            </Section>
        </Box>
    );
}
