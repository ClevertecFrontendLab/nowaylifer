import { Avatar, Box, Card, CardBody, CardProps, HStack, Text } from '@chakra-ui/react';

export interface BlogCardProps extends CardProps {
    author: { displayName: string; username?: string; avatarSrc?: string };
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
                    src={author.avatarSrc}
                    name={author.displayName}
                    size={{ base: 'sm', lg: 'md' }}
                />
                <Box>
                    <Box fontWeight='medium' fontSize={{ base: 'md', lg: 'lg' }}>
                        {author.displayName}
                    </Box>
                    <Box fontSize='sm' color='blackAlpha.700'>
                        {author.username}
                    </Box>
                </Box>
            </HStack>
            <Text noOfLines={3}>{content}</Text>
        </CardBody>
    </Card>
);
