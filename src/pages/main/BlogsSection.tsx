import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Heading, HStack, SimpleGrid } from '@chakra-ui/react';

import { BlogCard } from '~/shared/ui/BlogCard';
import { Section } from '~/shared/ui/Section';

export const BlogsSection = () => (
    <Section>
        <Box bg='lime.300' borderRadius='2xl' p={{ base: 3, lg: 6 }}>
            <HStack align='center' justify='space-between' mb={{ base: 3, lg: 5, '2xl': 8 }}>
                <Heading fontSize={{ base: '2xl', lg: '3xl', '2xl': '4xl' }} fontWeight='medium'>
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
);
