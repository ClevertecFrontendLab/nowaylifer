import { Avatar, Box, Card, CardBody, CardProps, HStack, Text } from '@chakra-ui/react';

import { Author } from '~/entities/recipe';

export interface BlogCardProps extends CardProps {
    author: Author;
    content: string;
}

export const BlogCard = ({ author, content, ...rest }: BlogCardProps) => (
    <Card
        boxShadow='none'
        borderWidth='1px'
        borderColor='blackAlpha.200'
        transitionProperty='box-shadow'
        transitionDuration='normal'
        _hover={{ boxShadow: 'card-hover' }}
        {...rest}
    >
        <CardBody px={{ base: 4, '2xl': 6 }} pb={{ base: 4, '2xl': 5 }} pt={{ base: 4, '2xl': 6 }}>
            <HStack gap={{ base: 2, lg: 3 }} mb={{ base: 2, '2xl': 4 }}>
                <Avatar
                    src={author.avatar}
                    name={author.firstName + ' ' + author.lastName}
                    size={{ base: 'sm', lg: 'md' }}
                />
                <Box>
                    <Box noOfLines={1} fontWeight='medium' fontSize={{ base: 'md', lg: 'lg' }}>
                        {author.firstName + ' ' + author.lastName}
                    </Box>
                    <Box noOfLines={1} fontSize='sm' color='blackAlpha.700'>
                        {`@${author.login}`}
                    </Box>
                </Box>
            </HStack>
            <Text fontSize='sm' noOfLines={3}>
                {content}
            </Text>
        </CardBody>
    </Card>
);
