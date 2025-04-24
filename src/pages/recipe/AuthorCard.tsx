import { Avatar, Box, Card, CardBody, CardProps, HStack, VStack } from '@chakra-ui/react';

import { Button } from '~/shared/ui/Button';
import { FriendsStat } from '~/shared/ui/Stats';
import { SubscribeIcon } from '~/shared/ui/SubscribeIcon';

export interface AuthorCardProps extends CardProps {
    displayName: string;
    username: string;
    avatar?: string;
    friends?: number;
}

export const AuthorCard = ({ avatar, displayName, username, friends = 0 }: AuthorCardProps) => (
    <Card bg='lime.300' border='none' pos='relative'>
        <CardBody p={{ base: 3, md: 6 }}>
            <HStack align='stretch' gap={{ base: 2, md: 4 }}>
                <Avatar size='xl' src={avatar} />
                <VStack align='stretch' gap={0} flexGrow={1}>
                    <HStack justify='space-between' wrap='wrap-reverse' columnGap={2} rowGap={0}>
                        <Box
                            fontWeight={{ base: 'semibold', md: 'bold' }}
                            fontSize={{ base: 'lg', md: '2xl' }}
                            lineHeight={{ base: 'base', md: 'short' }}
                        >
                            {displayName}
                        </Box>
                        <Box ml='auto' alignSelf='start' fontSize='xs' lineHeight='short'>
                            Автор рецепта
                        </Box>
                    </HStack>
                    <Box fontSize='sm' color='blackAlpha.700' flexGrow={1}>
                        {username}
                    </Box>
                    <HStack justify='space-between' alignSelf='stretch'>
                        <Button variant='inverted' size='xs' leftIcon={<SubscribeIcon />}>
                            Подписаться
                        </Button>
                        {friends > 0 && (
                            <FriendsStat variant='outline' flex='0' fontSize='xs' value={friends} />
                        )}
                    </HStack>
                </VStack>
            </HStack>
        </CardBody>
    </Card>
);
