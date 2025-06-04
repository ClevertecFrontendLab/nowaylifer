import { Flex } from '@chakra-ui/react';

import { BlogCard, BlogCardProps } from '~/entities/blog';
import { BlogSubscriptionButton, useSubscribeToBlogMutation } from '~/features/subscribe-to-blog';
import { selectSessionDataInvariant } from '~/shared/session';
import { useAppSelector } from '~/shared/store';

export const OtherBlogCard = ({ blog, ...props }: Omit<BlogCardProps, 'actionSlot'>) => {
    const { userId } = useAppSelector(selectSessionDataInvariant);
    const [subscribe, { isLoading }] = useSubscribeToBlogMutation();

    const handleSubscribe = () => subscribe({ currentUserId: userId, blogId: blog._id });

    return (
        <BlogCard
            blog={blog}
            isLoading={isLoading}
            actionSlot={
                <Flex>
                    <BlogSubscriptionButton
                        size='xs'
                        _disabled={{}}
                        isDisabled={isLoading}
                        onClick={handleSubscribe}
                    />
                </Flex>
            }
            {...props}
        />
    );
};
