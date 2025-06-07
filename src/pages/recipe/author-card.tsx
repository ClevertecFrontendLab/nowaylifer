import { Avatar, Box, Card, CardBody, CardProps, HStack, VStack } from '@chakra-ui/react';

import { Blogger } from '~/entities/blog';
import {
    BlogSubscriptionButton,
    useToggleBlogSubscriptionMutation,
} from '~/features/subscribe-to-blog';
import { selectSessionDataInvariant } from '~/shared/session';
import { useAppSelector } from '~/shared/store';
import { SubscribersStat } from '~/shared/ui/stats';
import { formatUsername, getFullName } from '~/shared/util';

export interface AuthorCardProps extends CardProps {
    author: Blogger;
    isSubscribed?: boolean;
}

export const AuthorCard = ({ author, isSubscribed = false, ...cardProps }: AuthorCardProps) => {
    const [toggleSubscribe, { isLoading }] = useToggleBlogSubscriptionMutation();
    const { userId } = useAppSelector(selectSessionDataInvariant);

    const handleSubscription = () => {
        toggleSubscribe({ bloggerId: author._id, currentUserId: userId });
    };

    return (
        <Card bg='lime.300' border='none' pos='relative' {...cardProps}>
            <CardBody p={{ base: 3, md: 6 }}>
                <HStack align='stretch' gap={{ base: 2, md: 4 }}>
                    <Avatar size='xl' name={getFullName(author.firstName, author.lastName)} />
                    <VStack align='stretch' gap={0} flexGrow={1}>
                        <HStack
                            justify='space-between'
                            wrap='wrap-reverse'
                            columnGap={2}
                            rowGap={0}
                        >
                            <Box
                                fontWeight={{ base: 'semibold', md: 'bold' }}
                                fontSize={{ base: 'lg', md: '2xl' }}
                                lineHeight={{ base: 'base', md: 'short' }}
                            >
                                {getFullName(author.firstName, author.lastName)}
                            </Box>
                            <Box ml='auto' alignSelf='start' fontSize='xs' lineHeight='short'>
                                Автор рецепта
                            </Box>
                        </HStack>
                        <Box fontSize='sm' color='blackAlpha.700' flexGrow={1}>
                            {formatUsername(author.login)}
                        </Box>
                        <HStack justify='space-between' alignSelf='stretch'>
                            <BlogSubscriptionButton
                                onClick={handleSubscription}
                                isDisabled={isLoading}
                                isSubscribed={isSubscribed}
                            />
                            {!!author.subscribers?.length && (
                                <SubscribersStat
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
};
