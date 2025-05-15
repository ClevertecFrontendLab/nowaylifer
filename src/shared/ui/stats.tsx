import {
    IconProps,
    Stat,
    StatLabel,
    StatNumber,
    StatProps,
    VisuallyHidden,
} from '@chakra-ui/react';
import React, { cloneElement } from 'react';

import { BookmarkIcon } from './icons/bookmark';
import { EmojiHeartEyesIcon } from './icons/emoji-heart-eyes';
import { PeopleIcon } from './icons/people';
import { PeopleIconOutline } from './icons/people-outline';

export const BookmarksStat = (props: Omit<BaseStatProps, 'label' | 'icon'>) => (
    <BaseStat label='Количество добавленных в избранное' icon={<BookmarkIcon />} {...props} />
);

export const LikesStat = (props: Omit<BaseStatProps, 'label' | 'icon'>) => (
    <BaseStat label='Количество лайков' icon={<EmojiHeartEyesIcon />} {...props} />
);

export const FriendsStat = ({
    variant = 'solid',
    ...rest
}: { variant?: 'outline' | 'solid' } & Omit<BaseStatProps, 'label' | 'icon'>) => (
    <BaseStat
        label='Количество друзей'
        icon={variant === 'solid' ? <PeopleIcon /> : <PeopleIconOutline />}
        {...rest}
    />
);

interface BaseStatProps extends StatProps {
    icon: React.ReactElement<IconProps>;
    label: string;
    value: string | number;
}

const BaseStat = ({ icon, label, value, fontSize = 'inherit', ...rest }: BaseStatProps) => (
    <Stat
        p={1}
        fontSize={fontSize}
        sx={{
            '& > dl': {
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
            },
        }}
        {...rest}
    >
        <StatLabel lineHeight={0} fontSize='inherit'>
            {cloneElement<IconProps>(icon, { boxSize: icon.props.boxSize ?? '1em' })}
            <VisuallyHidden>{label}</VisuallyHidden>
        </StatLabel>
        <StatNumber lineHeight='short' fontWeight='semibold' fontSize='inherit' color='lime.600'>
            {value}
        </StatNumber>
    </Stat>
);
