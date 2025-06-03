import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import {
    Box,
    BoxProps,
    Button,
    ButtonProps,
    Center,
    SimpleGrid,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';

import { blogApi, BlogCard } from '~/entities/blog';
import { useAppLoader } from '~/shared/infra/app-loader';
import { selectSessionDataInvariant } from '~/shared/session';
import { useAppSelector } from '~/shared/store';

export const OtherBlogs = (props: BoxProps) => {
    const { userId } = useAppSelector(selectSessionDataInvariant);
    const maxBlogsCollapsed = useBreakpointValue({ base: 8, '3xl': 9 });
    const { isOpen: isExpanded, onClose: collapse, onOpen: expand } = useDisclosure();

    const { data: collapsedData, isLoading: isCollapsedLoading } = blogApi.useBlogsQuery(
        isExpanded ? skipToken : { currentUserId: userId },
    );

    const [fetchExpandedBlogs, { data: expandedData, isLoading: isExpandedLoading }] =
        blogApi.useLazyBlogsQuery();

    useAppLoader(isCollapsedLoading || isExpandedLoading);

    const handleExpand = async () => {
        const result = await fetchExpandedBlogs({ currentUserId: userId, limit: 'all' }, true);
        if (result.isSuccess) {
            expand();
        }
    };

    if (!collapsedData) return null;

    const blogsToShow = isExpanded
        ? expandedData?.others
        : collapsedData?.others.slice(0, maxBlogsCollapsed);

    return (
        <Box bg='blackAlpha.50' borderRadius='2xl' p={{ base: 4, lg: 6 }} {...props}>
            <SimpleGrid
                minChildWidth={{ base: '296px', md: '340px', lg: '408px', '2xl': '424px' }}
                autoRows={{ base: '200px', lg: '224px' }}
                spacingX={4}
                spacingY={{ base: 4, lg: 6 }}
                mb={{ base: 4, lg: 6 }}
            >
                {blogsToShow?.map((blog) => <BlogCard h='full' key={blog._id} blog={blog} />)}
            </SimpleGrid>
            <Center>
                {isExpanded ? (
                    <CollapseButton onClick={collapse} />
                ) : (
                    <ExpandButton onClick={handleExpand} />
                )}
            </Center>
        </Box>
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
