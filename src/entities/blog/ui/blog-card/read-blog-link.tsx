import { Button } from '@chakra-ui/react';
import { Link } from 'react-router';

import { RoutePath } from '~/shared/router';

export const ReadBlogLink = ({ blogId: userId }: { blogId: string }) => (
    <Button
        size='xs'
        variant='outline'
        colorScheme='lime'
        as={Link}
        px={3}
        to={`${RoutePath.Blog.build({ userId })}#notes`}
    >
        Читать
    </Button>
);
