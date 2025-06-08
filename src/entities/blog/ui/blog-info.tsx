import { Avatar, Box, Center, Flex, Heading, Stack, StackProps, VStack } from '@chakra-ui/react';

import { TestId } from '~/shared/test-ids';
import { Loader } from '~/shared/ui/loader';
import { formatUsername, getFullName } from '~/shared/util';

import { BlogDetailed } from '../interface';
import { BlogStats } from './blog-stats';

export interface BlogInfoProps extends StackProps {
    blog: BlogDetailed;
    actionSlot?: React.ReactElement;
    isLoading?: boolean;
}

export const BlogInfo = ({ blog, actionSlot, isLoading, ...props }: BlogInfoProps) => {
    const { firstName, lastName, login } = blog.bloggerInfo;
    const fullName = getFullName(firstName, lastName);

    return (
        <Stack
            direction={{ base: 'column', md: 'row' }}
            pos='relative'
            align='center'
            gap={6}
            data-test-id={TestId.BLOGGER_INFO}
            {...props}
        >
            {isLoading && (
                <Center pos='absolute' inset={0}>
                    <Loader />
                </Center>
            )}
            <Avatar size={{ base: 'xl', lg: '2xl' }} name={fullName} />
            <VStack gap={3} align={{ base: 'center', md: 'start' }} w='full' minW='268px'>
                <Heading
                    lineHeight={{ base: 8, lg: 'none' }}
                    fontSize={{ base: '2xl', lg: '5xl' }}
                    data-test-id={TestId.BLOGGER_INFO_NAME}
                >
                    {fullName}
                </Heading>
                <Box
                    lineHeight={5}
                    fontSize='sm'
                    color='blackAlpha.700'
                    data-test-id={TestId.BLOGGER_INFO_LOGIN}
                >
                    {formatUsername(login)}
                </Box>
                <Flex w='full' maxW='328px'>
                    {actionSlot}
                    <BlogStats
                        bookmarksCount={blog.totalBookmarks}
                        subsribersCount={blog.totalSubscribers}
                        bookmarkStatProps={{ 'data-test-id': TestId.BLOGGER_BOOKMARKS_STAT }}
                        subscribersStatProps={{ 'data-test-id': TestId.BLOGGER_SUBSCRIBERS_STAT }}
                        ml='auto'
                    />
                </Flex>
            </VStack>
        </Stack>
    );
};
