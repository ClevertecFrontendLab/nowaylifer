import { Box, BoxProps } from '@chakra-ui/react';

import { BaseStatProps, BookmarksStat, SubscribersStat } from '~/shared/ui/stats';

export interface BlogStatsProps extends BoxProps {
    bookmarksCount: number;
    subsribersCount: number;
    bookmarkStatProps?: Partial<BaseStatProps>;
    subscribersStatProps?: Omit<Partial<BaseStatProps>, 'variant'>;
}

export const BlogStats = ({
    bookmarksCount,
    subsribersCount,
    bookmarkStatProps,
    subscribersStatProps,
    ...props
}: BlogStatsProps) => (
    <Box display='flex' gap={2} fontSize='xs' {...props}>
        {bookmarksCount > 0 && <BookmarksStat value={bookmarksCount} {...bookmarkStatProps} />}
        {subsribersCount > 0 && (
            <SubscribersStat variant='outline' value={subsribersCount} {...subscribersStatProps} />
        )}
    </Box>
);
