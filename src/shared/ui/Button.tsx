import { Button as BaseButton, ButtonProps as BaseButtonProps } from '@chakra-ui/react';
import React from 'react';

export type ButtonProps = Omit<BaseButtonProps, 'leftIcon' | 'rightIcon'> &
    (
        | { topIcon?: undefined; leftIcon?: React.ReactElement; rightIcon?: React.ReactElement }
        | { topIcon: React.ReactElement; leftIcon?: undefined; rightIcon?: undefined }
    );

export const Button = ({
    iconSpacing = '0.5rem',
    topIcon,
    leftIcon,
    children,
    flexDirection,
    h,
    sx,
    ...rest
}: ButtonProps) => (
    <BaseButton
        sx={{ ...(topIcon && { '& .chakra-button__icon': { mb: iconSpacing, me: 0 } }), ...sx }}
        flexDirection={topIcon ? 'column' : flexDirection}
        iconSpacing={iconSpacing}
        h={h ?? (topIcon ? 'auto' : undefined)}
        leftIcon={leftIcon ?? topIcon}
        {...rest}
    >
        {children}
    </BaseButton>
);
