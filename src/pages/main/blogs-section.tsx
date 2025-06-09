import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Heading, HStack, SimpleGrid } from '@chakra-ui/react';

import { blogApi, BlogCard } from '~/entities/blog';
import { useAppLoader } from '~/shared/infra/app-loader';
import { RoutePath } from '~/shared/router';
import { selectSessionDataInvariant } from '~/shared/session/slice';
import { useAppSelector } from '~/shared/store';
import { TestId } from '~/shared/test-ids';
import { Link } from '~/shared/ui/link';
import { Section } from '~/shared/ui/section';
import { isE2E } from '~/shared/util';

export const BlogsSection = () => {
    const { userId } = useAppSelector(selectSessionDataInvariant);
    const { data, isLoading } = blogApi.useBlogsQuery({
        currentUserId: userId,
        // tests expect only empty string for some reason
        limit: isE2E() ? '' : 3,
    });

    const blogs = data?.others ?? [];

    useAppLoader(isLoading);

    if (!blogs.length) return null;

    return (
        <Section data-test-id={TestId.MAIN_PAGE_BLOGS_SECTION}>
            <Box bg='lime.300' borderRadius='2xl' p={{ base: 3, lg: 6 }}>
                <HStack align='center' justify='space-between' mb={{ base: 3, lg: 5, '2xl': 8 }}>
                    <Heading
                        fontSize={{ base: '2xl', lg: '3xl', '2xl': '4xl' }}
                        fontWeight='medium'
                    >
                        Кулинарные блоги
                    </Heading>
                    <Button
                        as={Link}
                        to={RoutePath.Blogs}
                        hideBelow='lg'
                        variant='ghost'
                        size={{ base: 'md', '2xl': 'lg' }}
                        rightIcon={<ArrowForwardIcon />}
                        data-test-id={TestId.MAIN_PAGE_BLOGS_BUTTON}
                    >
                        Все авторы
                    </Button>
                </HStack>
                <SimpleGrid
                    data-test-id={TestId.MAIN_PAGE_BLOGS_GRID}
                    columns={{ base: 1, md: 3 }}
                    spacing={{ base: 3, lg: 4 }}
                    mb={{ base: 3, lg: 0 }}
                >
                    {blogs.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} withStats={false} />
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
};
