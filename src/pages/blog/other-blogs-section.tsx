import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';

import { blogApi } from '~/entities/blog';
import { useAppLoader } from '~/shared/infra/app-loader';
import { RoutePath } from '~/shared/router';
import { selectSessionDataInvariant } from '~/shared/session/slice';
import { useAppSelector } from '~/shared/store';
import { TestId } from '~/shared/test-ids';
import { Link } from '~/shared/ui/link';
import { Section, SectionHeading } from '~/shared/ui/section';
import { OtherBlogCard } from '~/widgets/other-blog-card';

export interface OtherBlogsProps {
    currentBlogId: string;
    maxBlogs?: number;
}

export const OtherBlogsSection = ({ currentBlogId, maxBlogs = 3 }: OtherBlogsProps) => {
    const { userId } = useAppSelector(selectSessionDataInvariant);
    const { data, isLoading } = blogApi.useOtherBlogsQuery({ currentUserId: userId, limit: '' });

    useAppLoader(isLoading);

    const blogs = data?.filter((blog) => blog._id !== currentBlogId).slice(0, maxBlogs) ?? [];

    if (!blogs.length) return null;

    return (
        <Section>
            <Flex justify='space-between' mb={{ base: 4, lg: 6 }}>
                <SectionHeading as='h3' fontWeight={{ base: 'semibold', lg: 'medium' }}>
                    Другие блоги
                </SectionHeading>
                <Button
                    as={Link}
                    variant='ghost'
                    to={RoutePath.Blogs}
                    size={{ base: 'xs', lg: 'lg' }}
                    rightIcon={<ArrowForwardIcon />}
                    data-test-id={TestId.OTHER_BLOGS_BUTTON}
                >
                    Всe авторы
                </Button>
            </Flex>
            <Flex
                gap={{ base: 3, lg: 4 }}
                direction={{ base: 'column', md: 'row' }}
                data-test-id={TestId.OTHER_BLOGS_GRID}
            >
                {blogs.map((blog) => (
                    <OtherBlogCard minH='216px' flex={1} key={blog._id} blog={blog} />
                ))}
            </Flex>
        </Section>
    );
};
