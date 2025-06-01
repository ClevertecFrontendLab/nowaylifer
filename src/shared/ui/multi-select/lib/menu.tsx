import { chakra, HTMLChakraProps, Portal, PortalProps } from '@chakra-ui/react';
import { cx, lazyDisclosure, LazyMode, MaybeRenderProp, runIfFn } from '@chakra-ui/utils';
import { noop } from 'lodash-es';
import { useRef } from 'react';

import { multiSelectClassNames } from './anatomy';
import { useMultiSelectContext, useMultiSelectStyles } from './context';

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
    style,
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
            {...getMenuProps(
                { 'aria-multiselectable': true, ...popper.getPopperProps({ style }) },
                { suppressRefError: true },
            )}
            children={shouldRenderChildren ? children : null}
            {...props}
        />
    );
    return withinPortal ? <Portal {...portalProps}>{element}</Portal> : element;
};

export interface MultiSelectMenuListProps extends HTMLChakraProps<'ul'> {}

export const MultiSelectMenuList = ({ className, ...props }: MultiSelectMenuListProps) => {
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
    children?: MaybeRenderProp<{ isSelected: boolean; isHighlighted: boolean }>;
}

export const MultiSelectItem = <Item,>({
    item,
    className,
    children,
    index,
    ...props
}: MultiSelectItemProps<Item>) => {
    const styles = useMultiSelectStyles();
    const isSelected = useMultiSelectContext((ctx) => ctx.isItemSelected(item));
    const isHighlighted = useMultiSelectContext((ctx) => ctx.state.highlightedIndex === index);
    const getItemProps = useMultiSelectContext((ctx) => ctx.getItemProps);

    return (
        <chakra.li
            __css={styles.item}
            className={cx(multiSelectClassNames.item, className)}
            data-focus={isHighlighted || undefined}
            {...getItemProps({
                item,
                index,
                'aria-selected': isSelected,
            })}
            onMouseDown={noop} // override downshift handler
            {...props}
        >
            {runIfFn(children, { isSelected, isHighlighted })}
        </chakra.li>
    );
};
