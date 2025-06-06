import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Heading, HStack, SimpleGrid } from '@chakra-ui/react';

import { Author } from '~/entities/recipe';
import alexAvatarUrl from '~/shared/assets/alex.png';
import ekaterinaAvatarUrl from '~/shared/assets/ekaterina.png';
import elenaAvatarUrl from '~/shared/assets/elena.png';
import { BlogCard } from '~/shared/ui/blog-card';
import { Section } from '~/shared/ui/section';

const authors: Author[] = [
    { firstName: 'Елена', lastName: 'Высоцкая', login: 'elenapovar', avatar: elenaAvatarUrl },
    { firstName: 'Alex', lastName: 'Cook', login: 'funtasticooking', avatar: alexAvatarUrl },
    {
        firstName: 'Екатерина',
        lastName: 'Константинопольская',
        login: 'bake_and_pie',
        avatar: ekaterinaAvatarUrl,
    },
];

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
                {authors.map((author) => (
                    <BlogCard
                        key={author.login}
                        author={author}
                        content='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                    />
                ))}
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
