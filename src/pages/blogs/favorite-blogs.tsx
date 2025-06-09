import { Box, BoxProps, Button, Heading, LinkOverlay, SimpleGrid } from '@chakra-ui/react';

import { blogApi, BlogCard, BlogCardProps } from '~/entities/blog';
import { BlogReadLink } from '~/entities/blog/ui/blog-card/blog-read-link';
import { useAppLoader } from '~/shared/infra/app-loader';
import { RoutePath } from '~/shared/router';
import { selectSessionDataInvariant } from '~/shared/session';
import { useAppSelector } from '~/shared/store';
import { TestId } from '~/shared/test-ids';
import { Link } from '~/shared/ui/link';
import { Section } from '~/shared/ui/section';

export const FavoriteBlogs = (props: BoxProps) => {
    const { userId } = useAppSelector(selectSessionDataInvariant);

    const { data, isLoading } = blogApi.useBlogsQuery({
        currentUserId: userId,
        limit: 9,
    });

    useAppLoader(isLoading);

    const blogs = data?.favorites ?? [];

    if (!blogs.length) return null;

    return (
        <Section
            bg='lime.300'
            p={{ base: 3, lg: 6 }}
            borderRadius='2xl'
            data-test-id={TestId.BLOGS_FAVORITES_SECTION}
            {...props}
        >
            <Heading
                as='h2'
                fontSize={{ base: '2xl', lg: '4xl' }}
                fontWeight={{ base: 'medium', lg: 'normal' }}
                lineHeight={{ base: 8, lg: 10 }}
                mb={{ base: 3, lg: 4 }}
            >
                Избранные блоги
            </Heading>
            <SimpleGrid
                autoRows='1fr'
                minChildWidth={{
                    base: '304px',
                    md: '346px',
                    lg: '408px',
                    '3xl': blogs.length >= 7 ? '426px' : '648px',
                }}
                spacing={{ base: 3, lg: 4 }}
                data-test-id={TestId.BLOGS_FAVORITES_GRID}
            >
                {blogs?.map((blog) => <FavoriteBlogCard blog={blog} key={blog._id} />)}
            </SimpleGrid>
        </Section>
    );
};

const FavoriteBlogCard = ({ blog, ...props }: BlogCardProps) => (
    <BlogCard
        blog={blog}
        maxW={{ '3xl': '648px' }}
        minH={{ base: '208px', lg: '224px' }}
        withNewRecipesCount
        actionSlot={
            <>
                <LinkOverlay
                    as={Link}
                    to={RoutePath.Blog.build({ userId: blog._id })}
                    data-test-id={TestId.BLOG_CARD_RECIPES_BUTTON}
                >
                    <Button as={Box} px={3} bg='lime.400' size='xs'>
                        Рецепты
                    </Button>
                </LinkOverlay>
                <BlogReadLink blog={blog} />
            </>
        }
        {...props}
    />
);
