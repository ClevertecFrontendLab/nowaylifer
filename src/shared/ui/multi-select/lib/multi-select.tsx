import {
    chakra,
    FormControlOptions,
    HTMLChakraProps,
    omitThemingProps,
    ThemingProps,
    useMultiStyleConfig,
    usePopper,
    UsePopperProps,
} from '@chakra-ui/react';
import { cx, MaybeRenderProp, runIfFn } from '@chakra-ui/utils';
import { Modifier } from '@popperjs/core';
import { useMemo } from 'react';

import { multiSelectClassNames } from './anatomy';
import {
    MultiSelectContext,
    MultiSelectStylesProvider,
    useMultiSelectContext,
    useMultiSelectStyles,
} from './context';
import { MultiSelectState, useMultiSelect, UseMultiSelectProps } from './use-multi-select';

interface MultiSelectOptions<Item> {
    focusBorderColor?: string;
    errorBorderColor?: string;
    containerProps?: HTMLChakraProps<'div'>;
    popperConfig?: Omit<UsePopperProps, 'enabled'>;
    children?: MaybeRenderProp<MultiSelectState<Item>>;
}

export interface MultiSelectProps<Item>
    extends UseMultiSelectProps<Item>,
        ThemingProps<'MultiSelect'>,
        MultiSelectOptions<Item>,
        FormControlOptions {}

export const MultiSelect = <Item,>({
    children,
    containerProps,
    ...props
}: MultiSelectProps<Item>) => {
    const styles = useMultiStyleConfig('MultiSelect', props);
    const { popperConfig, ...ownProps } = omitThemingProps(props);
    const multiSelect = useMultiSelect(ownProps);

    const { modifiers = [], ...config } = popperConfig ?? {};
    const popper = usePopper({
        enabled: multiSelect.state.isOpen,
        modifiers: [matchWidth, ...modifiers],
        matchWidth: true,
        gutter: 0,
        ...config,
    });

    const ctx = useMemo(() => ({ ...multiSelect, popper }), [multiSelect, popper]);

    return (
        <MultiSelectContext.Provider value={ctx}>
            <MultiSelectStylesProvider value={styles}>
                <MultiSelectContainer {...containerProps}>
                    {runIfFn(children, ctx.state)}
                </MultiSelectContainer>
            </MultiSelectStylesProvider>
        </MultiSelectContext.Provider>
    );
};

const MultiSelectContainer = ({ className, ...props }: HTMLChakraProps<'div'>) => {
    const styles = useMultiSelectStyles();
    const { state } = useMultiSelectContext();
    return (
        <chakra.div
            __css={styles.container}
            aria-disabled={state.isDisabled}
            aria-invalid={state.isInvalid}
            className={cx(multiSelectClassNames.container, className)}
            {...props}
        />
    );
};

// fix for chakra own modifier
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const matchWidth: Partial<Modifier<'matchWidth', any>> = {
    name: 'matchWidth',
    effect: ({ state }) => {
        const reference = state.elements.reference as HTMLElement;
        state.elements.popper.style.width = `${reference.offsetWidth}px`;
    },
};
