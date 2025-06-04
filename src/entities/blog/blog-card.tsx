import {
    Avatar,
    Box,
    BoxProps,
    Card,
    CardBody,
    CardProps,
    Center,
    Flex,
    HStack,
    Spacer,
    Text,
} from '@chakra-ui/react';

import { Loader } from '~/shared/ui/loader';
import { BookmarksStat, SubscribersStat } from '~/shared/ui/stats';
import { formatUsername, getFullName } from '~/shared/util';

import { Blog } from './interface';

export interface BlogCardProps extends CardProps {
    blog: Blog;
    actionSlot?: React.ReactElement;
    isLoading?: boolean;
}

export const BlogCard = ({ blog, isLoading, actionSlot, ...props }: BlogCardProps) => (
    <Card
        boxShadow='none'
        borderWidth='1px'
        borderColor='blackAlpha.200'
        transitionProperty='box-shadow'
        transitionDuration='normal'
        pos='relative'
        _hover={{ boxShadow: 'card-hover' }}
        {...props}
    >
        <>
            {isLoading && (
                <Center pos='absolute' inset={0}>
                    <Loader />
                </Center>
            )}
            <CardBody
                display='flex'
                flexDir='column'
                px={{ base: 4, '2xl': 6 }}
                pb={{ base: 4, '2xl': 5 }}
                pt={{ base: 4, '2xl': 6 }}
            >
                <HStack gap={{ base: 2, lg: 3 }} mb={{ base: 2, '2xl': 4 }}>
                    <Avatar
                        name={getFullName(blog.firstName, blog.lastName)}
                        size={{ base: 'sm', lg: 'md' }}
                    />
                    <Box>
                        <Box noOfLines={1} fontWeight='medium' fontSize={{ base: 'md', lg: 'lg' }}>
                            {getFullName(blog.firstName, blog.lastName)}
                        </Box>
                        <Box noOfLines={1} fontSize='sm' color='blackAlpha.700'>
                            {formatUsername(blog.login)}
                        </Box>
                    </Box>
                </HStack>
                <Text fontSize='sm' noOfLines={3}>
                    {blog.notes[0]?.text}
                </Text>
                <Spacer />
                <Flex>
                    {actionSlot}
                    <BlogCardStats
                        bookmarksCount={blog.bookmarksCount}
                        subsribersCount={blog.subscribersCount}
                        ml='auto'
                    />
                </Flex>
            </CardBody>
        </>
    </Card>
);

export interface BlogCardStatsProps extends BoxProps {
    bookmarksCount: number;
    subsribersCount: number;
}

export const BlogCardStats = ({
    bookmarksCount,
    subsribersCount,
    ...props
}: BlogCardStatsProps) => (
    <Box display='flex' gap={2} fontSize='xs' {...props}>
        {bookmarksCount > 0 && <BookmarksStat value={bookmarksCount} />}
        {subsribersCount > 0 && <SubscribersStat variant='outline' value={subsribersCount} />}
    </Box>
);
