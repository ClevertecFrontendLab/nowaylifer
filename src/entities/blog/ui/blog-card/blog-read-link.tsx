import { Button, ButtonProps } from '@chakra-ui/react';
import { Link } from 'react-router';

import { RoutePath } from '~/shared/router';
import { TestId } from '~/shared/test-ids';

import { Blog } from '../../interface';

export interface ReadBlogLinkProps extends ButtonProps {
    blog: Blog;
}

export const BlogReadLink = ({ blog, ...props }: ReadBlogLinkProps) => (
    <Button
        px={3}
        as={Link}
        size='xs'
        variant='outline'
        colorScheme='lime'
        lineHeight={5}
        to={`${RoutePath.Blog.build({ userId: blog._id })}#notes`}
        data-test-id={TestId.BLOG_CARD_READ_BUTTON}
        {...props}
    >
        Читать
    </Button>
);
