import {
    IconProps,
    Stat,
    StatLabel,
    StatLabelProps,
    StatNumber,
    StatNumberProps,
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

export const SubscribersStat = ({
    variant = 'solid',
    ...rest
}: { variant?: 'outline' | 'solid' } & Omit<BaseStatProps, 'label' | 'icon'>) => (
    <BaseStat
        label='Количество подписчиков'
        icon={variant === 'solid' ? <PeopleIcon /> : <PeopleIconOutline />}
        {...rest}
    />
);

interface BaseStatProps extends StatProps {
    icon: React.ReactElement<IconProps>;
    label: string;
    value: string | number;
    labelProps?: StatLabelProps;
    numberProps?: StatNumberProps;
}

const BaseStat = ({
    icon,
    label,
    value,
    labelProps,
    numberProps,
    fontSize = 'inherit',
    ...props
}: BaseStatProps) => (
    <Stat
        p={1}
        fontSize={fontSize}
        sx={{ '& > dl': { display: 'flex', alignItems: 'center', gap: 1.5 } }}
        {...props}
    >
        <StatLabel lineHeight='none' fontSize='inherit' {...labelProps}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {cloneElement<IconProps>(icon, { boxSize: icon.props.boxSize ?? '1em' })}
        </StatLabel>
        <StatNumber
            lineHeight={4}
            fontWeight='semibold'
            fontSize='inherit'
            color='lime.600'
            {...numberProps}
        >
            {value}
        </StatNumber>
    </Stat>
);
