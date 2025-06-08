import { Box, BoxProps, Button, Heading, LinkOverlay, SimpleGrid } from '@chakra-ui/react';

import { blogApi, BlogCard, BlogCardProps } from '~/entities/blog';
import { useAppLoader } from '~/shared/infra/app-loader';
import { RoutePath } from '~/shared/router';
import { selectSessionDataInvariant } from '~/shared/session';
import { useAppSelector } from '~/shared/store';
import { TestId } from '~/shared/test-ids';
import { Link } from '~/shared/ui/link';
import { Section } from '~/shared/ui/section';

export const FavoriteBlogs = (props: BoxProps) => {
    const { userId } = useAppSelector(selectSessionDataInvariant);

    const { data: { favorites } = {}, isLoading } = blogApi.useBlogsQuery({
        currentUserId: userId,
    });

    useAppLoader(isLoading);

    if (!favorites || !favorites.length) return null;

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
                minChildWidth={{ base: '304px', md: '346px', lg: '408px' }}
                spacing={{ base: 3, lg: 4 }}
                data-test-id={TestId.BLOGS_FAVORITES_GRID}
            >
                {favorites?.map((blog) => <FavoriteBlogCard blog={blog} key={blog._id} />)}
            </SimpleGrid>
        </Section>
    );
};

const FavoriteBlogCard = ({ blog, ...props }: BlogCardProps) => (
    <BlogCard
        blog={blog}
        withNewRecipesCount
        actionSlot={
            <LinkOverlay
                as={Link}
                to={RoutePath.Blog.build({ userId: blog._id })}
                data-test-id={TestId.BLOG_CARD_RECIPES_BUTTON}
            >
                <Button as={Box} px={3} bg='lime.400' size='xs'>
                    Рецепты
                </Button>
            </LinkOverlay>
        }
        {...props}
    />
);
