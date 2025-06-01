import {
    HStack,
    IconButton,
    IconButtonProps,
    Input,
    InputProps,
    StackProps,
} from '@chakra-ui/react';
import { useRef } from 'react';

import { useAppDispatch, useAppSelector } from '~/shared/store';
import { PlusCircleIcon } from '~/shared/ui/icons/plus-circle';
import {
    MultiSelect,
    MultiSelectClearButton,
    MultiSelectField,
    MultiSelectFieldProps,
    MultiSelectIcon,
    MultiSelectItem,
    MultiSelectMenu,
    MultiSelectMenuList,
    MultiSelectMenuProps,
    MultiSelectProps,
    MultiSelectTag,
    MultiSelectTagList,
    useMultiSelectContext,
} from '~/shared/ui/multi-select';

import {
    applyFilter,
    selectAppliedFilter,
    selectFilter,
    selectFilterOptions,
    setFilter,
} from '../slice';
import { FilterOption, FilterType } from '../types';

interface FilterSelectTestId {
    menu: string;
    field: string;
    footerInput: string;
    footerButton: string;
    option: (option: FilterOption, index: number) => string | undefined;
}

interface FilterSelectOptions {
    filterType: FilterType;
    appliedFilter?: boolean;
    applyOnChange?: boolean;
    withFooter?: boolean;
    footerInputPlaceholder?: string;
    testId?: Partial<FilterSelectTestId>;
}

export interface FilterSelectProps
    extends Omit<MultiSelectProps<FilterOption>, 'items' | 'children' | 'itemToString'>,
        Pick<MultiSelectMenuProps, 'withinPortal' | 'portalProps'>,
        Pick<MultiSelectFieldProps, 'placeholder'>,
        FilterSelectOptions {}

export const FilterSelect = ({
    filterType,
    portalProps,
    withinPortal,
    isDisabled,
    popperConfig,
    placeholder,
    withFooter,
    footerInputPlaceholder,
    appliedFilter = false,
    applyOnChange = false,
    testId,
    onChange,
    onIsOpenChange,
    containerProps,
}: FilterSelectProps) => {
    const selector = appliedFilter ? selectAppliedFilter : selectFilter;
    const filterState = useAppSelector((state) => selector(state, filterType));
    const options = useAppSelector((state) => selectFilterOptions(state, filterType));
    const dispatch = useAppDispatch();

    return (
        <MultiSelect
            containerProps={containerProps}
            isDisabled={isDisabled}
            popperConfig={popperConfig}
            itemToString={(item) => (item ? item.label : '')}
            items={options}
            value={filterState}
            onIsOpenChange={onIsOpenChange}
            onChange={(value) => {
                dispatch(setFilter({ type: filterType, filters: value }));
                if (applyOnChange) {
                    dispatch(applyFilter(filterType));
                }
                onChange?.(value);
            }}
        >
            {({ selectedItems, items }) => (
                <>
                    <MultiSelectField placeholder={placeholder} data-test-id={testId?.field} />
                    <MultiSelectTagList>
                        {selectedItems.map((selectedItem, index) => (
                            <MultiSelectTag
                                key={selectedItem.value + index}
                                item={selectedItem}
                                index={index}
                            >
                                {selectedItem.label}
                            </MultiSelectTag>
                        ))}
                    </MultiSelectTagList>
                    <MultiSelectClearButton />
                    <MultiSelectIcon />
                    <MultiSelectMenu
                        withinPortal={withinPortal}
                        portalProps={portalProps}
                        data-test-id={testId?.menu}
                    >
                        <MultiSelectMenuList>
                            {items.map((item, index) => (
                                <MultiSelectItem
                                    key={item.value + index}
                                    item={item}
                                    index={index}
                                    data-test-id={testId?.option?.(item, index)}
                                >
                                    {item.label}
                                </MultiSelectItem>
                            ))}
                        </MultiSelectMenuList>
                        {withFooter && (
                            <FilterSelectMenuFooter
                                filterType={filterType}
                                buttonProps={{ 'data-test-id': testId?.footerButton }}
                                inputProps={{
                                    'data-test-id': testId?.footerInput,
                                    placeholder: footerInputPlaceholder,
                                }}
                            />
                        )}
                    </MultiSelectMenu>
                </>
            )}
        </MultiSelect>
    );
};

export interface FilterSelectFooterProps extends StackProps {
    filterType: FilterType;
    inputProps?: InputProps;
    buttonProps?: Omit<IconButtonProps, 'aria-label'>;
}

const FilterSelectMenuFooter = ({
    inputProps,
    buttonProps,
    filterType,
    ...props
}: FilterSelectFooterProps) => {
    const { addSelectedItem, state } = useMultiSelectContext<FilterOption>();
    const inputRef = useRef<HTMLInputElement>(null);

    const addCustomValue = () => {
        const inputEl = inputRef.current;
        if (!inputEl) return;

        const value = inputEl?.value?.trim().toLowerCase();
        if (value && !state.selectedItems.some((i) => i.value === value)) {
            addSelectedItem({ label: inputEl.value.trim(), value, type: filterType });
            inputEl.value = '';
        }
        inputEl.focus();
    };

    return (
        <HStack py={2} pl={6} pr={2} {...props}>
            <Input
                ref={inputRef}
                size='sm'
                borderRadius='base'
                onKeyDown={(e) => e.key === 'Enter' && addCustomValue()}
                {...inputProps}
            />
            <IconButton
                variant='ghost'
                onClick={addCustomValue}
                size='xs'
                color='lime.600'
                aria-label='Добавить в список'
                icon={<PlusCircleIcon />}
                {...buttonProps}
            />
        </HStack>
    );
};
