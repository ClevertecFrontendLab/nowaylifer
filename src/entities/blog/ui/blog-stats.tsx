import { Box, BoxProps } from '@chakra-ui/react';

import { BookmarksStat, SubscribersStat } from '~/shared/ui/stats';

export interface BlogStatsProps extends BoxProps {
    bookmarksCount: number;
    subsribersCount: number;
}

export const BlogStats = ({ bookmarksCount, subsribersCount, ...props }: BlogStatsProps) => (
    <Box display='flex' gap={2} fontSize='xs' {...props}>
        {bookmarksCount > 0 && <BookmarksStat value={bookmarksCount} />}
        {subsribersCount > 0 && <SubscribersStat variant='outline' value={subsribersCount} />}
    </Box>
);
