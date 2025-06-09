import { BlogCard, BlogCardProps } from '~/entities/blog';
import { BlogReadLink } from '~/entities/blog/ui/blog-card/blog-read-link';
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
            minH={{ base: '208px', lg: '224px' }}
            blog={blog}
            isLoading={isLoading}
            actionSlot={
                <>
                    <BlogSubscriptionButton
                        isDisabled={isLoading}
                        isSubscribed={blog.isFavorite}
                        onClick={handleSubscription}
                    />
                    <BlogReadLink blog={blog} />
                </>
            }
            {...props}
        />
    );
};
