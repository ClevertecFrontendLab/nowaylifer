import { Flex } from '@chakra-ui/react';

import { BlogCard, BlogCardProps } from '~/entities/blog';
import {
    BlogSubscriptionButton,
    useToggleBlogSubscriptionMutation,
} from '~/features/subscribe-to-blog';
import { selectSessionDataInvariant } from '~/shared/session';
import { useAppSelector } from '~/shared/store';

export const OtherBlogCard = ({ blog, ...props }: Omit<BlogCardProps, 'actionSlot'>) => {
    const { userId } = useAppSelector(selectSessionDataInvariant);
    const [toggleSubscription, { isLoading }] = useToggleBlogSubscriptionMutation();

    const handleSubscription = () => {
        toggleSubscription({ currentUserId: userId, bloggerId: blog._id });
    };

    return (
        <BlogCard
            blog={blog}
            isLoading={isLoading}
            actionSlot={
                <Flex>
                    <BlogSubscriptionButton
                        isSubscribed={blog.isFavorite}
                        isDisabled={isLoading}
                        onClick={handleSubscription}
                    />
                </Flex>
            }
            {...props}
        />
    );
};
