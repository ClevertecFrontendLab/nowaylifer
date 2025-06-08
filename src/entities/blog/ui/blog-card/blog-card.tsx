import {
    Avatar,
    Box,
    Card,
    CardBody,
    CardProps,
    Center,
    Flex,
    HStack,
    LinkBox,
    LinkOverlay,
    Spacer,
    Text,
} from '@chakra-ui/react';

import { RoutePath } from '~/shared/router';
import { TestId } from '~/shared/test-ids';
import { Link } from '~/shared/ui/link';
import { Loader } from '~/shared/ui/loader';
import { formatUsername, getFullName } from '~/shared/util';

import { Blog } from '../../interface';
import { BlogStats } from '../blog-stats';
import { NewRecipesBadge } from './new-recipes-badge';
import { ReadBlogLink } from './read-blog-link';

export interface BlogCardProps extends CardProps {
    blog: Blog;
    actionSlot?: React.ReactElement;
    isLoading?: boolean;
    withNewRecipesCount?: boolean;
}

export const BlogCard = ({
    blog,
    isLoading,
    actionSlot,
    withNewRecipesCount = false,
    ...props
}: BlogCardProps) => {
    const renderNewRecipesBadge = withNewRecipesCount && blog.newRecipesCount > 0;

    return (
        <LinkBox
            as={Card}
            data-test-id={TestId.BLOG_CARD}
            boxShadow='none'
            borderWidth='1px'
            borderColor='blackAlpha.200'
            transitionProperty='box-shadow'
            transitionDuration='normal'
            _hover={{ boxShadow: 'card-hover' }}
            pos='relative'
            {...props}
        >
            <>
                {isLoading && (
                    <Center pos='absolute' inset={0}>
                        <Loader data-test-id={TestId.BLOG_CARD_LOADER} />
                    </Center>
                )}
                {renderNewRecipesBadge && (
                    <NewRecipesBadge
                        data-test-id={TestId.BLOG_CARD_NEW_RECIPES}
                        count={blog.newRecipesCount}
                        pos='absolute'
                        right={{ base: 1, lg: 2 }}
                        top={{ base: 1, lg: 2 }}
                    />
                )}
                <CardBody
                    display='flex'
                    flexDir='column'
                    px={{ base: 4, '2xl': 6 }}
                    pb={{ base: 4, '2xl': 5 }}
                    pt={{ base: renderNewRecipesBadge ? 6 : 4, '2xl': 6 }}
                >
                    <HStack gap={{ base: 2, lg: 3 }} mb={{ base: 2, '2xl': 4 }}>
                        <Avatar name={getFullName(blog.firstName, blog.lastName)} size='md' />
                        <LinkOverlay
                            as={Link}
                            to={RoutePath.Blog.build({ userId: blog._id })}
                            overflow='hidden'
                        >
                            <Box
                                isTruncated
                                fontWeight='medium'
                                fontSize={{ base: 'md', lg: 'lg' }}
                                data-test-id={TestId.BLOG_CARD_NAME}
                            >
                                {getFullName(blog.firstName, blog.lastName)}
                            </Box>
                            <Box
                                isTruncated
                                fontSize='sm'
                                color='blackAlpha.700'
                                data-test-id={TestId.BLOG_CARD_LOGIN}
                            >
                                {formatUsername(blog.login)}
                            </Box>
                        </LinkOverlay>
                    </HStack>
                    <Text fontSize='sm' noOfLines={3} mb={4} data-test-id={TestId.BLOG_CARD_NOTE}>
                        {blog.notes?.[0]?.text}
                    </Text>
                    <Spacer />
                    <Flex wrap='wrap-reverse' justify='end' rowGap={4} columnGap={2}>
                        <Flex gap={2}>
                            {actionSlot}
                            <ReadBlogLink blogId={blog._id} />
                        </Flex>
                        <BlogStats
                            bookmarksCount={blog.bookmarksCount}
                            subsribersCount={blog.subscribersCount}
                            ml='auto'
                        />
                    </Flex>
                </CardBody>
            </>
        </LinkBox>
    );
};
