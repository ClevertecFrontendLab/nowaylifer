import { Avatar, Box, Card, CardBody, CardProps, HStack, Text } from '@chakra-ui/react';

import { formatUsername, getFullName } from '~/shared/util';

import { Blog } from './interface';

export interface BlogCardProps extends CardProps {
    blog: Blog;
}

export const BlogCard = ({ blog, ...props }: BlogCardProps) => (
    <Card
        boxShadow='none'
        borderWidth='1px'
        borderColor='blackAlpha.200'
        transitionProperty='box-shadow'
        transitionDuration='normal'
        _hover={{ boxShadow: 'card-hover' }}
        {...props}
    >
        <CardBody px={{ base: 4, '2xl': 6 }} pb={{ base: 4, '2xl': 5 }} pt={{ base: 4, '2xl': 6 }}>
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
        </CardBody>
    </Card>
);
