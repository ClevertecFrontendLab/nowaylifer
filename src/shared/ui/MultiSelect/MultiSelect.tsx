import {
    chakra,
    HTMLChakraProps,
    omitThemingProps,
    ThemingProps,
    useMultiStyleConfig,
    usePopper,
    UsePopperProps,
} from '@chakra-ui/react';
import { cx, MaybeRenderProp, runIfFn } from '@chakra-ui/utils';

import { multiSelectClassNames } from './anatomy';
import {
    MultiSelectProvider,
    MultiSelectStylesProvider,
    useMultiSelectContext,
    useMultiSelectStyles,
} from './context';
import { MultiSelectState, useMultiSelect, UseMultiSelectProps } from './use-multi-select';

interface MultiSelectOptions<Item> {
    focusBorderColor?: string;
    containerProps?: HTMLChakraProps<'div'>;
    disabled?: boolean;
    popperConfig?: Omit<UsePopperProps, 'enabled'>;
    children?: MaybeRenderProp<MultiSelectState<Item>>;
}

export interface MultiSelectProps<Item>
    extends UseMultiSelectProps<Item>,
        ThemingProps<'MultiSelect'>,
        MultiSelectOptions<Item> {}

export const MultiSelect = <Item,>({
    children,
    containerProps,
    ...props
}: MultiSelectProps<Item>) => {
    const styles = useMultiStyleConfig('MultiSelect', props);
    const { itemToString, items, closeOnSelect, disabled, onChange, value, popperConfig } =
        omitThemingProps(props);
    const ctx = useMultiSelect({ items, itemToString, closeOnSelect, disabled, onChange, value });
    const popper = usePopper({
        enabled: true,
        matchWidth: true,
        ...popperConfig,
    });
    return (
        <MultiSelectProvider value={{ ...ctx, popper }}>
            <MultiSelectStylesProvider value={styles}>
                <MultiSelectContainer {...containerProps}>
                    {runIfFn(children, ctx.state)}
                </MultiSelectContainer>
            </MultiSelectStylesProvider>
        </MultiSelectProvider>
    );
};

const MultiSelectContainer = ({ className, ...props }: HTMLChakraProps<'div'>) => {
    const styles = useMultiSelectStyles();
    const { state } = useMultiSelectContext();
    return (
        <chakra.div
            __css={styles.container}
            aria-disabled={state.disabled}
            className={cx(multiSelectClassNames.container, className)}
            {...props}
        />
    );
};
