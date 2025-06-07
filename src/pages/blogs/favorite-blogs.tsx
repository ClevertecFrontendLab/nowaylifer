import { BoxProps, Heading, SimpleGrid } from '@chakra-ui/react';

import { blogApi, BlogCard } from '~/entities/blog';
import { useAppLoader } from '~/shared/infra/app-loader';
import { selectSessionDataInvariant } from '~/shared/session';
import { useAppSelector } from '~/shared/store';
import { Section } from '~/shared/ui/section';

export const FavoriteBlogs = (props: BoxProps) => {
    const { userId } = useAppSelector(selectSessionDataInvariant);

    const { data: { favorites } = {}, isLoading } = blogApi.useBlogsQuery({
        currentUserId: userId,
    });

    useAppLoader(isLoading);

    if (!favorites || !favorites.length) return null;

    return (
        <Section bg='lime.300' p={{ base: 3, lg: 6 }} borderRadius='2xl' {...props}>
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
                minChildWidth={{ base: '304px', md: '346px', lg: '408px' }}
                spacing={{ base: 3, lg: 4 }}
            >
                {favorites?.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
            </SimpleGrid>
        </Section>
    );
};
