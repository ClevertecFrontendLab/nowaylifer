import { useMultipleSelection, useSelect, UseSelectProps } from 'downshift';
import { useMemo } from 'react';

export interface BaseItem {
    value: string;
    label: string;
}

export interface UseMultiSelectProps<Item> {
    items: Item[];
    itemToString: UseSelectProps<Item>['itemToString'];
    itemToKey?: UseSelectProps<Item>['itemToKey'];
    value?: NoInfer<Item>[];
    disabled?: boolean;
    onChange?: (selectedItems: NoInfer<Item>[]) => void;
    onIsOpenChange?: UseSelectProps<Item>['onIsOpenChange'];
    closeOnSelect?: boolean;
}

export const useMultiSelect = <Item>({
    items,
    closeOnSelect,
    itemToString,
    itemToKey = (item) => item,
    value,
    disabled,
    onChange,
    onIsOpenChange,
}: UseMultiSelectProps<Item>) => {
    const {
        getSelectedItemProps,
        getDropdownProps,
        addSelectedItem,
        reset: resetSelection,
        activeIndex,
        removeSelectedItem,
        selectedItems,
    } = useMultipleSelection<Item>({
        selectedItems: value,
        itemToKey,
        onSelectedItemsChange: (changes) => {
            onChange?.(changes.selectedItems);
        },
        stateReducer: (state, { type, changes }) => {
            switch (type) {
                case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
                    if (closeOnSelect) {
                        return changes;
                    }
                    return {
                        ...changes,
                        activeIndex:
                            state.activeIndex > 0 ? changes.activeIndex : state.activeIndex,
                    };
                default:
                    return changes;
            }
        },
    });

    const selectedItemsSet = useMemo(() => new Set(selectedItems), [selectedItems]);

    const isItemSelected = (item: Item) => selectedItemsSet.has(item);

    const { isOpen, highlightedIndex, getToggleButtonProps, getMenuProps, getItemProps } =
        useSelect({
            selectedItem: null,
            defaultHighlightedIndex: -1,
            items,
            itemToString,
            itemToKey,
            onIsOpenChange,
            stateReducer: (state, { type, changes }) => {
                switch (type) {
                    case useSelect.stateChangeTypes.ItemClick:
                        if (closeOnSelect) return changes;
                        return {
                            ...changes,
                            isOpen: true,
                            highlightedIndex: state.highlightedIndex,
                        };
                    default:
                        return changes;
                }
            },
            onStateChange: ({ type, selectedItem }) => {
                switch (type) {
                    case useSelect.stateChangeTypes.ItemClick: {
                        if (!selectedItem) return;
                        if (isItemSelected(selectedItem)) {
                            removeSelectedItem(selectedItem);
                        } else {
                            addSelectedItem(selectedItem);
                        }
                        break;
                    }
                }
            },
        });

    return {
        state: { isOpen, items, selectedItems, highlightedIndex, activeIndex, disabled },
        itemToKey,
        resetSelection,
        addSelectedItem,
        removeSelectedItem,
        getToggleButtonProps,
        getItemProps,
        getMenuProps,
        getSelectedItemProps,
        getDropdownProps,
        isItemSelected,
    };
};

export type UseMultiSelectReturn<Item> = ReturnType<typeof useMultiSelect<Item>>;
export type MultiSelectState<Item> = UseMultiSelectReturn<Item>['state'];
