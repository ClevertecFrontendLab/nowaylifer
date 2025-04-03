import {
    IconProps,
    Stat,
    StatLabel,
    StatNumber,
    StatProps,
    VisuallyHidden,
} from '@chakra-ui/react';
import React, { cloneElement } from 'react';

import { BookmarkIcon } from './BookmarkIcon';
import { EmojiHeartEyesIcon } from './EmojiHeartEyesIcon';
import { PeopleIcon } from './PeopleIcon';

export const BookmarkStat = (props: Omit<BaseStatProps, 'label' | 'icon'>) => (
    <BaseStat label='Количество добавленных в избранное' icon={<BookmarkIcon />} {...props} />
);

export const LikesStat = (props: Omit<BaseStatProps, 'label' | 'icon'>) => (
    <BaseStat label='Количество лайков' icon={<EmojiHeartEyesIcon />} {...props} />
);

export const FriendsStat = (props: Omit<BaseStatProps, 'label' | 'icon'>) => (
    <BaseStat label='Количество друзей' icon={<PeopleIcon />} {...props} />
);

interface BaseStatProps extends StatProps {
    icon: React.ReactElement<IconProps>;
    label: string;
    value: string | number;
}

const BaseStat = ({ icon, label, value, fontSize = 'xs', ...rest }: BaseStatProps) => (
    <Stat
        p={1}
        fontSize={fontSize}
        sx={{
            '& > dl': {
                display: 'flex',
                alignItems: 'center',
                gap: 2,
            },
        }}
        {...rest}
    >
        <StatLabel lineHeight={0} fontSize={fontSize}>
            {cloneElement<IconProps>(icon, { boxSize: icon.props.boxSize ?? '1em' })}
            <VisuallyHidden>{label}</VisuallyHidden>
        </StatLabel>
        <StatNumber lineHeight={1.33} fontWeight='semibold' fontSize={fontSize} color='lime.600'>
            {value}
        </StatNumber>
    </Stat>
);
