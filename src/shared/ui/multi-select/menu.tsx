import { chakra, HTMLChakraProps, Portal, PortalProps } from '@chakra-ui/react';
import { cx, lazyDisclosure, LazyMode, MaybeRenderProp, runIfFn } from '@chakra-ui/utils';
import { noop } from 'lodash';
import { useRef } from 'react';

import { multiSelectClassNames } from './anatomy';
import { useMultiSelectContext, useMultiSelectStyles } from './context';
import { MultiSelectState } from './use-multi-select';

export interface MultiSelectMenuProps extends HTMLChakraProps<'div'> {
    isLazy?: boolean;
    lazyBehavior?: LazyMode;
    withinPortal?: boolean;
    portalProps?: PortalProps;
}

export const MultiSelectMenu = ({
    className,
    withinPortal,
    isLazy,
    lazyBehavior = 'unmount',
    children,
    portalProps,
    ...props
}: MultiSelectMenuProps) => {
    const styles = useMultiSelectStyles();
    const { popper, state, getMenuProps } = useMultiSelectContext();
    const hasBeenOpenedRef = useRef(false);
    const shouldRenderChildren = lazyDisclosure({
        enabled: isLazy,
        mode: lazyBehavior,
        isSelected: state.isOpen,
        wasSelected: hasBeenOpenedRef.current,
    });

    if (state.isOpen && !hasBeenOpenedRef.current) {
        hasBeenOpenedRef.current = true;
    }

    const element = (
        <chakra.div
            __css={{ ...styles.menu, visibility: state.isOpen ? 'visible' : 'hidden' }}
            className={cx(multiSelectClassNames.menu, className)}
            {...popper.getPopperProps()}
            {...getMenuProps(
                { 'aria-multiselectable': true, ...popper.getPopperProps() },
                { suppressRefError: true },
            )}
            children={shouldRenderChildren ? children : null}
            {...props}
        />
    );
    return withinPortal ? <Portal {...portalProps}>{element}</Portal> : element;
};

export const MultiSelectMenuList = ({ className, ...props }: HTMLChakraProps<'ul'>) => {
    const styles = useMultiSelectStyles();
    return (
        <chakra.ul
            __css={styles.menuList}
            className={cx(multiSelectClassNames.menuList, className)}
            {...props}
        />
    );
};

export interface MultiSelectItemProps<Item> extends Omit<HTMLChakraProps<'li'>, 'children'> {
    item: Item;
    index?: number;
    children?: MaybeRenderProp<MultiSelectState<Item> & { isSelected: boolean }>;
}

export const MultiSelectItem = <Item,>({
    item,
    index,
    className,
    children,
    ...props
}: MultiSelectItemProps<Item>) => {
    const styles = useMultiSelectStyles();
    const { state, getItemProps, itemToKey } = useMultiSelectContext<Item>();
    const isSelected = state.selectedItems.some(
        (selectedItem) => itemToKey(item) === itemToKey(selectedItem),
    );
    return (
        <chakra.li
            __css={styles.item}
            className={cx(multiSelectClassNames.item, className)}
            data-focus={state.highlightedIndex === index || undefined}
            {...getItemProps({
                item,
                index,
                'aria-selected': isSelected,
            })}
            onMouseDown={noop} // override downshift handler
            {...props}
        >
            {runIfFn(children, { ...state, isSelected })}
        </chakra.li>
    );
};
