import { ChevronDownIcon } from '@chakra-ui/icons';
import { chakra, CloseButton, CloseButtonProps, HTMLChakraProps } from '@chakra-ui/react';
import { cx } from '@chakra-ui/utils';
import { ReactNode } from 'react';

import { multiSelectClassNames } from './anatomy';
import { useMultiSelectContext, useMultiSelectStyles } from './context';

export interface MultiSelectFieldProps extends HTMLChakraProps<'button'> {
    placeholder?: string;
    placeholderProps?: HTMLChakraProps<'span'>;
}

export const MultiSelectField = ({
    placeholder,
    placeholderProps: _placeholderProps,
    className,
    ...props
}: MultiSelectFieldProps) => {
    const styles = useMultiSelectStyles();
    const { state, getToggleButtonProps, getDropdownProps, popper } = useMultiSelectContext();
    const { className: placeholderClassName, ...placeholderProps } = _placeholderProps ?? {};
    return (
        <chakra.button
            type='button'
            __css={styles.field}
            disabled={state.disabled}
            data-focus={state.isOpen || undefined}
            className={cx(multiSelectClassNames.field, className)}
            {...getToggleButtonProps(
                getDropdownProps({
                    preventKeyAction: state.isOpen,
                    ref: popper.referenceRef,
                }),
            )}
            {...props}
        >
            <chakra.div
                __css={{
                    ...styles.placeholder,
                    visibility: state.selectedItems.length ? 'hidden' : 'visible',
                }}
                className={cx(multiSelectClassNames.placeholder, placeholderClassName)}
                {...placeholderProps}
            >
                {placeholder ?? 'Select...'}
            </chakra.div>
        </chakra.button>
    );
};

export const MultiSelectClearButton = ({ className, sx, ...props }: CloseButtonProps) => {
    const styles = useMultiSelectStyles();
    const { resetSelection, state } = useMultiSelectContext();
    return (
        <CloseButton
            visibility={state.selectedItems.length ? 'visible' : 'hidden'}
            size='sm'
            onClick={resetSelection}
            sx={{ ...styles.clearButton, ...sx }}
            className={cx(multiSelectClassNames.clearButton, className)}
            aria-label='Clear selection'
            {...props}
        />
    );
};

export interface MultiSelectIconProps extends Omit<HTMLChakraProps<'div'>, 'children'> {
    icon?: ReactNode;
}

export const MultiSelectIcon = ({ icon }: MultiSelectIconProps) => {
    const styles = useMultiSelectStyles();
    const { state } = useMultiSelectContext();
    return (
        <chakra.div
            __css={styles.icon}
            className={multiSelectClassNames.icon}
            data-expanded={state.isOpen}
        >
            {icon ?? <ChevronDownIcon transform={`rotate(${state.isOpen ? 180 : 0}deg)`} />}
        </chakra.div>
    );
};
