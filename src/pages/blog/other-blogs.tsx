import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';

import { blogApi } from '~/entities/blog';
import { useAppLoader } from '~/shared/infra/app-loader';
import { RoutePath } from '~/shared/router';
import { selectSessionDataInvariant } from '~/shared/session/slice';
import { useAppSelector } from '~/shared/store';
import { Link } from '~/shared/ui/link';
import { OtherBlogCard } from '~/widgets/other-blog-card';

export interface OtherBlogsProps {
    currentBlogId: string;
    maxBlogs?: number;
}

export const OtherBlogs = ({ currentBlogId, maxBlogs = 3 }: OtherBlogsProps) => {
    const { userId } = useAppSelector(selectSessionDataInvariant);
    const { data, isLoading } = blogApi.useOtherBlogsQuery({ currentUserId: userId });

    useAppLoader(isLoading);

    const blogs = data?.filter((blog) => blog._id !== currentBlogId).slice(0, maxBlogs) ?? [];

    if (!blogs.length) return null;

    return (
        <Box>
            <Flex justify='space-between' mb={{ base: 4, lg: 6 }}>
                <Heading
                    as='h3'
                    fontWeight={{ base: 'semibold', lg: 'medium' }}
                    fontSize={{ base: '2xl', lg: '5xl' }}
                >
                    Другие блоги
                </Heading>
                <Button
                    as={Link}
                    variant='ghost'
                    to={RoutePath.Blogs}
                    size={{ base: 'xs', lg: 'lg' }}
                    rightIcon={<ArrowForwardIcon />}
                >
                    Все авторы
                </Button>
            </Flex>
            <Flex gap={{ base: 3, lg: 4 }} direction={{ base: 'column', md: 'row' }}>
                {blogs.map((blog) => (
                    <OtherBlogCard minH='216px' flex={1} key={blog._id} blog={blog} />
                ))}
            </Flex>
        </Box>
    );
};
