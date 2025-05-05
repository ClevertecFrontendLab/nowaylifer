import { Avatar, Box, Card, CardBody, CardProps, HStack, VStack } from '@chakra-ui/react';

import { Author } from '~/entities/recipe/interface';
import { Button } from '~/shared/ui/button';
import { FriendsStat } from '~/shared/ui/stats';
import { SubscribeIcon } from '~/shared/ui/subscribe-icon';

export interface AuthorCardProps extends CardProps {
    author: Author;
}

export const AuthorCard = ({ author, ...cardProps }: AuthorCardProps) => (
    <Card bg='lime.300' border='none' pos='relative' {...cardProps}>
        <CardBody p={{ base: 3, md: 6 }}>
            <HStack align='stretch' gap={{ base: 2, md: 4 }}>
                <Avatar size='xl' name={author.firstName + '' + author.lastName} />
                <VStack align='stretch' gap={0} flexGrow={1}>
                    <HStack justify='space-between' wrap='wrap-reverse' columnGap={2} rowGap={0}>
                        <Box
                            fontWeight={{ base: 'semibold', md: 'bold' }}
                            fontSize={{ base: 'lg', md: '2xl' }}
                            lineHeight={{ base: 'base', md: 'short' }}
                        >
                            {author.firstName + '' + author.lastName}
                        </Box>
                        <Box ml='auto' alignSelf='start' fontSize='xs' lineHeight='short'>
                            Автор рецепта
                        </Box>
                    </HStack>
                    <Box fontSize='sm' color='blackAlpha.700' flexGrow={1}>
                        {`@${author.login}`}
                    </Box>
                    <HStack justify='space-between' alignSelf='stretch'>
                        <Button variant='inverted' size='xs' leftIcon={<SubscribeIcon />}>
                            Подписаться
                        </Button>
                        {!!author.subscribers?.length && (
                            <FriendsStat
                                variant='outline'
                                flex='0'
                                fontSize='xs'
                                value={author.subscribers.length}
                            />
                        )}
                    </HStack>
                </VStack>
            </HStack>
        </CardBody>
    </Card>
);
