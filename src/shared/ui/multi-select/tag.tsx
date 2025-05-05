import {
    chakra,
    HTMLChakraProps,
    Tag,
    TagCloseButton,
    TagCloseButtonProps,
    TagLabel,
    TagLabelProps,
    TagProps,
} from '@chakra-ui/react';
import { cx, MaybeRenderProp, runIfFn } from '@chakra-ui/utils';

import { multiSelectClassNames } from './anatomy';
import { useMultiSelectContext, useMultiSelectStyles } from './context';
import { MultiSelectState } from './use-multi-select';

export interface MultiSelectTagListProps<Item> extends Omit<HTMLChakraProps<'div'>, 'children'> {
    children?: MaybeRenderProp<MultiSelectState<Item>>;
}

export const MultiSelectTagList = <Item,>({
    className,
    children,
    ...props
}: MultiSelectTagListProps<Item>) => {
    const styles = useMultiSelectStyles();
    const { state } = useMultiSelectContext<Item>();
    return (
        <chakra.div
            __css={styles.tagList}
            className={cx(multiSelectClassNames.tagList, className)}
            {...props}
        >
            {runIfFn(children, state)}
        </chakra.div>
    );
};

export interface MultiSelectTagProps<Item> extends TagProps {
    item: Item;
    index?: number;
    closeButtonProps?: TagCloseButtonProps;
    labelProps?: TagLabelProps;
}

export const MultiSelectTag = <Item,>({
    item,
    index,
    className,
    children,
    labelProps,
    closeButtonProps,
    sx,
    ...props
}: MultiSelectTagProps<Item>) => {
    const { removeSelectedItem, getSelectedItemProps } = useMultiSelectContext();
    const styles = useMultiSelectStyles();
    return (
        <Tag
            size='sm'
            sx={{ ...styles.tag, ...sx }}
            className={cx(multiSelectClassNames.tag, className)}
            {...getSelectedItemProps({ selectedItem: item, index })}
            {...props}
        >
            <TagLabel {...labelProps}>{children}</TagLabel>
            <TagCloseButton
                onClick={(e) => {
                    e.stopPropagation();
                    removeSelectedItem(item);
                }}
                {...closeButtonProps}
            />
        </Tag>
    );
};
