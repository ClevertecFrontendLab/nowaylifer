import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import {
    BoxProps,
    Button,
    ButtonProps,
    Center,
    SimpleGrid,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';

import { blogApi } from '~/entities/blog';
import { useAppLoader } from '~/shared/infra/app-loader';
import { selectSessionDataInvariant } from '~/shared/session';
import { useAppSelector } from '~/shared/store';
import { TestId } from '~/shared/test-ids';
import { Section } from '~/shared/ui/section';
import { OtherBlogCard } from '~/widgets/other-blog-card';

export const OtherBlogs = (props: BoxProps) => {
    const { userId } = useAppSelector(selectSessionDataInvariant);
    const maxBlogsCollapsed = useBreakpointValue({ base: 8, '3xl': 9 });
    const { isOpen: isExpanded, onClose: collapse, onOpen: expand } = useDisclosure();

    const { data: { others: collapsedBlogs = [] } = {}, isLoading: isCollapsedLoading } =
        blogApi.useBlogsQuery(isExpanded ? skipToken : { currentUserId: userId, limit: 9 });

    const [
        fetchExpandedBlogs,
        { data: { others: expandedBlogs = [] } = {}, isLoading: isExpandedLoading },
    ] = blogApi.useLazyBlogsQuery();

    useAppLoader(isCollapsedLoading || isExpandedLoading);

    const handleExpand = async () => {
        const result = await fetchExpandedBlogs({ currentUserId: userId, limit: 'all' }, true);
        if (result.isSuccess) expand();
    };

    if (!collapsedBlogs.length) return null;

    const blogsToShow = isExpanded ? expandedBlogs : collapsedBlogs.slice(0, maxBlogsCollapsed);

    return (
        <Section
            bg='blackAlpha.50'
            borderRadius='2xl'
            p={{ base: 4, lg: 6 }}
            data-test-id={TestId.BLOGS_OTHERS_SECTION}
            {...props}
        >
            <SimpleGrid
                minChildWidth={{
                    base: '304px',
                    md: '346px',
                    lg: '408px',
                    '2xl': blogsToShow.length >= 7 ? '426px' : '648px',
                }}
                autoRows={{ base: '200px', lg: '224px' }}
                spacingX={4}
                spacingY={{ base: 4, lg: 6 }}
                mb={{ base: 4, lg: 6 }}
                data-test-id={TestId.BLOGS_OTHERS_GRID}
            >
                {blogsToShow?.map((blog) => (
                    <OtherBlogCard key={blog._id} blog={blog} maxW={{ '3xl': '648px' }} h='full' />
                ))}
            </SimpleGrid>
            {collapsedBlogs.length !== expandedBlogs.length && (
                <Center>
                    {isExpanded ? (
                        <CollapseButton
                            onClick={collapse}
                            data-test-id={TestId.BLOGS_OTHERS_BUTTON}
                        />
                    ) : (
                        <ExpandButton
                            onClick={handleExpand}
                            data-test-id={TestId.BLOGS_OTHERS_BUTTON}
                        />
                    )}
                </Center>
            )}
        </Section>
    );
};

const CollapseButton = (props: ButtonProps) => (
    <Button leftIcon={<ArrowBackIcon />} size='lg' variant='ghost' {...props}>
        Свернуть
    </Button>
);

const ExpandButton = (props: ButtonProps) => (
    <Button rightIcon={<ArrowForwardIcon />} size='lg' variant='ghost' {...props}>
        Все авторы
    </Button>
);
