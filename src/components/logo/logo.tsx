import type { ComponentProps } from 'react';
import LogoSvg from '@assets/icons/logo.svg?react';
import LogoShortSvg from '@assets/icons/logo-short.svg?react';

export type LogoProps = {
    type?: 'normal' | 'short';
} & ComponentProps<typeof LogoSvg>;

export const Logo = ({ type = 'normal', style, ...rest }: LogoProps) => {
    const props = {
        style: { maxWidth: '100%', height: 'auto', display: 'block', ...style },
        ...rest,
    };

    return type === 'normal' ? <LogoSvg {...props} /> : <LogoShortSvg {...props} />;
};
