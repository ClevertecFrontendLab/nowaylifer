import {
    IconButton,
    IconButtonProps,
    Input,
    InputGroup,
    InputGroupProps,
    InputProps,
    InputRightElement,
    useBoolean,
} from '@chakra-ui/react';

import { ViewIcon, ViewOffIcon } from './icons';

export interface PasswordInputProps extends InputProps {
    containerProps?: InputGroupProps;
    visibilityButtonProps?: Omit<IconButtonProps, 'aria-label'>;
}

export const PasswordInput = ({
    size,
    containerProps,
    visibilityButtonProps,
    ...props
}: PasswordInputProps) => {
    const [isVisible, { on, off }] = useBoolean(false);
    return (
        <InputGroup size={size} {...containerProps}>
            <Input type={isVisible ? 'text' : 'password'} {...props} />
            <InputRightElement>
                <IconButton
                    variant='ghost'
                    size={size}
                    h='auto'
                    minW='none'
                    p={1.5}
                    onMouseDown={on}
                    onMouseUp={off}
                    onTouchStart={on}
                    onTouchEnd={off}
                    icon={isVisible ? <ViewIcon /> : <ViewOffIcon />}
                    aria-label={isVisible ? 'Скрыть пароль' : 'Показать пароль'}
                    {...visibilityButtonProps}
                />
            </InputRightElement>
        </InputGroup>
    );
};
