import { Center, Spacer } from '@chakra-ui/react';
import { QueryStatus } from '@reduxjs/toolkit/query';
import { useRef } from 'react';
import { useLoaderData } from 'react-router';

import { blogApi, BlogInfo } from '~/entities/blog';
import { BlogDetailed } from '~/entities/blog/interface';
import { recipeApi } from '~/entities/recipe';
import {
    BlogSubscriptionButton,
    useToggleBlogSubscriptionMutation,
} from '~/features/subscribe-to-blog';
import { useAppLoader } from '~/shared/infra/app-loader';
import { useScrollToHash } from '~/shared/router';
import { selectSessionDataInvariant } from '~/shared/session';
import { useAppSelector } from '~/shared/store';
import { Main } from '~/shared/ui/main';

import { BlogRecipes } from './blog-recipes';
import { NotesSection } from './notes-section';
import { OtherBlogsSection } from './other-blogs-section';

export const BlogPage = () => {
    const [toggleSubscription, { isLoading }] = useToggleBlogSubscriptionMutation();
    const { userId } = useAppSelector(selectSessionDataInvariant);
    const initialBlog = useLoaderData<BlogDetailed>();

    const bloggerId = initialBlog.bloggerInfo._id;

    const { data: blog = initialBlog } = blogApi.useBlogQuery({
        bloggerId,
        currentUserId: userId,
    });

    const { notes = [] } = blog.bloggerInfo;

    const {
        data: recipes = [],
        isLoading: isRecipesLoading,
        status,
    } = recipeApi.useRecipesByUserQuery(bloggerId);

    const recipesHasResolved = useHasResolved(status);

    useAppLoader(isRecipesLoading);

    const handleSubscription = () => toggleSubscription({ bloggerId, currentUserId: userId });

    useScrollToHash({ enabled: recipesHasResolved, behavior: 'smooth' });

    return (
        <Main>
            <Center mb={{ base: 4, lg: 10 }}>
                <BlogInfo
                    blog={blog}
                    isLoading={isLoading}
                    w={{ base: 'full', md: 'auto' }}
                    actionSlot={
                        <BlogSubscriptionButton
                            isSubscribed={blog.isFavorite}
                            isDisabled={isLoading}
                            onClick={handleSubscription}
                        />
                    }
                />
            </Center>
            {recipes.length > 0 && <BlogRecipes recipes={recipes} mb={{ base: 8, lg: 10 }} />}
            {notes.length > 0 && recipesHasResolved && <NotesSection notes={notes} />}
            <Spacer />
            <OtherBlogsSection currentBlogId={bloggerId} />
        </Main>
    );
};

const useHasResolved = (status: QueryStatus) => {
    const hasResolvedRef = useRef(false);
    if (status === QueryStatus.fulfilled || status === QueryStatus.rejected) {
        hasResolvedRef.current = true;
    }
    return hasResolvedRef.current;
};
