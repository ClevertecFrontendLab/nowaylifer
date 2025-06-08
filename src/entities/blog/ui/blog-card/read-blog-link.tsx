import { Button, ButtonProps } from '@chakra-ui/react';
import { Link } from 'react-router';

import { RoutePath } from '~/shared/router';
import { TestId } from '~/shared/test-ids';

export interface ReadBlogLinkProps extends ButtonProps {
    blogId: string;
}

export const ReadBlogLink = ({ blogId: userId, ...props }: ReadBlogLinkProps) => (
    <Button
        size='xs'
        variant='outline'
        colorScheme='lime'
        as={Link}
        px={3}
        to={`${RoutePath.Blog.build({ userId })}#notes`}
        data-test-id={TestId.BLOG_CARD_READ_BUTTON}
        {...props}
    >
        Читать
    </Button>
);
