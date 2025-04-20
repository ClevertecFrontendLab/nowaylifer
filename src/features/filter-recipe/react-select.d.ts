import { BoxProps, IconButtonProps, InputProps } from '@chakra-ui/react';
import type {} from 'react-select/base';

declare module 'react-select/base' {
    interface Props {
        menuRef?: React.Ref<HTMLDivElement>;
        controlRef?: React.Ref<HTMLDivElement>;
        menuFooterProps?: BoxProps & { ref?: React.Ref<HTMLDivElement> };
        menuInputProps?: InputProps & { ref?: React.Ref<HTMLInputElement> };
        menuButtonProps?: Omit<IconButtonProps, 'aria-label'> & { 'aria-label'?: string } & {
            ref?: React.Ref<HTMLButtonElement>;
        };
    }
}
