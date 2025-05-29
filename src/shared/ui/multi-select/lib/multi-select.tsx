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
import { useMemo } from 'react';

import { multiSelectClassNames } from './anatomy';
import {
    MultiSelectContext,
    MultiSelectDescendantsProvider,
    MultiSelectStylesProvider,
    useMultiSelectContext,
    useMultiSelectDescendants,
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
    const popper = usePopper({ enabled: true, matchWidth: true, gutter: 0, ...popperConfig });
    const descendants = useMultiSelectDescendants();
    const multiSelect = useMultiSelect(ownProps);

    const ctx = useMemo(() => ({ ...multiSelect, popper }), [multiSelect, popper]);

    return (
        <MultiSelectContext.Provider value={ctx}>
            <MultiSelectStylesProvider value={styles}>
                <MultiSelectDescendantsProvider value={descendants}>
                    <MultiSelectContainer {...containerProps}>
                        {runIfFn(children, ctx.state)}
                    </MultiSelectContainer>
                </MultiSelectDescendantsProvider>
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
