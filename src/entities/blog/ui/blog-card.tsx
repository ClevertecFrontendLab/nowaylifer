import {
    Avatar,
    Badge,
    BadgeProps,
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
import { Link } from '~/shared/ui/link';
import { Loader } from '~/shared/ui/loader';
import { formatUsername, getFullName, PluralForms, pluralizeRu } from '~/shared/util';

import { Blog } from '../interface';
import { BlogStats } from './blog-stats';

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
                        <Loader />
                    </Center>
                )}
                {renderNewRecipesBadge && (
                    <NewRecipesBadge
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
                    <HStack gap={{ base: 2, lg: 3 }} mb={{ base: 2, '2xl': 4 }} wrap='wrap'>
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
                            >
                                {getFullName(blog.firstName, blog.lastName)}
                            </Box>
                            <Box isTruncated fontSize='sm' color='blackAlpha.700'>
                                {formatUsername(blog.login)}
                            </Box>
                        </LinkOverlay>
                    </HStack>
                    <Text fontSize='sm' noOfLines={3}>
                        {blog.notes?.[0]?.text}
                    </Text>
                    <Spacer />
                    <Flex wrap='wrap-reverse'>
                        {actionSlot}
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

interface NewRecipesBadgeProps extends BadgeProps {
    count: number;
}

const NewRecipesBadge = ({ count, ...props }: NewRecipesBadgeProps) => (
    <Badge
        display='inline-block'
        lineHeight={5}
        borderRadius='base'
        px={2}
        size='xs'
        bg='blackAlpha.100'
        {...props}
    >
        {formatNewRecipesCount(count)}
    </Badge>
);

const forms: PluralForms = {
    one: 'новый рецeпт',
    few: 'новых рецепта',
    many: 'новых рецептов',
    other: 'новых рецептов',
};

const formatNewRecipesCount = (count: number) => `${count} ${pluralizeRu(count, forms)}`;
