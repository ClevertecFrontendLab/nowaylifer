import {
    Checkbox,
    HStack,
    HTMLChakraProps,
    Icon,
    IconButton,
    IconButtonProps,
    IconProps,
    Input,
    InputProps,
    StackProps,
} from '@chakra-ui/react';
import { useRef } from 'react';

import { useAppDispatch, useAppSelector } from '~/shared/store';
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
} from '~/shared/ui/MultiSelect';

import { filterOptions } from '../filter-options';
import { applyFilter, selectAppliedFilter, selectFilter, setFilter } from '../slice';
import { FilterOption, FilterType } from '../types';

interface FilterSelectOptions {
    filterType: FilterType;
    appliedFilter?: boolean;
    applyOnChange?: boolean;
    withFooter?: boolean;
    footerInputPlaceholder?: string;
    testId?: { menu?: string; field?: string; footerInput?: string; footerButton?: string };
}

export interface FilterSelectProps
    extends Pick<MultiSelectProps<FilterOption>, 'disabled' | 'popperConfig'>,
        Pick<MultiSelectMenuProps, 'withinPortal' | 'portalProps'>,
        Pick<MultiSelectFieldProps, 'placeholder'>,
        HTMLChakraProps<'div'>,
        FilterSelectOptions {}

export const FilterSelect = ({
    filterType,
    portalProps,
    withinPortal,
    disabled,
    popperConfig,
    placeholder,
    withFooter,
    footerInputPlaceholder,
    appliedFilter = false,
    applyOnChange = false,
    testId,
    ...containerProps
}: FilterSelectProps) => {
    const selector = appliedFilter ? selectAppliedFilter : selectFilter;
    const filterState = useAppSelector((state) => selector(state, filterType));
    const dispatch = useAppDispatch();
    return (
        <MultiSelect
            containerProps={{ _disabled: {}, ...containerProps }}
            focusBorderColor='lime.300'
            disabled={disabled}
            popperConfig={{ ...popperConfig, offset: [0, 0] }}
            itemToString={(item) => (item ? item.label : '')}
            items={filterOptions[filterType]}
            value={filterState}
            onChange={(value) => {
                dispatch(setFilter({ type: filterType, filters: value }));
                if (applyOnChange) {
                    dispatch(applyFilter(filterType));
                }
            }}
        >
            {({ selectedItems, items }) => (
                <>
                    <MultiSelectField placeholder={placeholder} data-test-id={testId?.field} />
                    <MultiSelectTagList>
                        {selectedItems.map((selectedItem, index) => (
                            <MultiSelectTag
                                variant='outline'
                                boxShadow='none'
                                border='1px'
                                color='lime.600'
                                borderColor='lime.400'
                                key={selectedItem.value + index}
                                item={selectedItem}
                                index={index}
                                closeButtonProps={{ display: 'none' }}
                            >
                                {selectedItem.label}
                            </MultiSelectTag>
                        ))}
                    </MultiSelectTagList>
                    <MultiSelectClearButton />
                    <MultiSelectIcon />
                    <MultiSelectMenu
                        py={1}
                        isLazy
                        withinPortal={withinPortal}
                        portalProps={portalProps}
                        data-test-id={testId?.menu}
                    >
                        <MultiSelectMenuList className='custom-scrollbar' maxH='328px'>
                            {items.map((item, index) => (
                                <MultiSelectItem
                                    key={item.value + index}
                                    item={item}
                                    index={index}
                                    _focus={{}}
                                    _selected={{}}
                                    _active={{}}
                                    _odd={{ bg: 'blackAlpha.100' }}
                                    data-test-id={item.testId}
                                >
                                    {({ isSelected }) => (
                                        <Checkbox
                                            size='sm'
                                            pointerEvents='none'
                                            isChecked={isSelected}
                                        >
                                            {item.label}
                                        </Checkbox>
                                    )}
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
                icon={<PlusIcon />}
                {...buttonProps}
            />
        </HStack>
    );
};

const PlusIcon = (props: IconProps) => (
    <Icon viewBox='0 0 12 12' boxSize='1em' {...props}>
        <path
            d='M12 6C12 7.5913 11.3679 9.11742 10.2426 10.2426C9.11742 11.3679 7.5913 12 6 12C4.4087 12 2.88258 11.3679 1.75736 10.2426C0.632141 9.11742 0 7.5913 0 6C0 4.4087 0.632141 2.88258 1.75736 1.75736C2.88258 0.632141 4.4087 0 6 0C7.5913 0 9.11742 0.632141 10.2426 1.75736C11.3679 2.88258 12 4.4087 12 6V6ZM6.375 3.375C6.375 3.27554 6.33549 3.18016 6.26517 3.10984C6.19484 3.03951 6.09946 3 6 3C5.90054 3 5.80516 3.03951 5.73484 3.10984C5.66451 3.18016 5.625 3.27554 5.625 3.375V5.625H3.375C3.27554 5.625 3.18016 5.66451 3.10984 5.73484C3.03951 5.80516 3 5.90054 3 6C3 6.09946 3.03951 6.19484 3.10984 6.26517C3.18016 6.33549 3.27554 6.375 3.375 6.375H5.625V8.625C5.625 8.72446 5.66451 8.81984 5.73484 8.89017C5.80516 8.96049 5.90054 9 6 9C6.09946 9 6.19484 8.96049 6.26517 8.89017C6.33549 8.81984 6.375 8.72446 6.375 8.625V6.375H8.625C8.72446 6.375 8.81984 6.33549 8.89017 6.26517C8.96049 6.19484 9 6.09946 9 6C9 5.90054 8.96049 5.80516 8.89017 5.73484C8.81984 5.66451 8.72446 5.625 8.625 5.625H6.375V3.375Z'
            fill='currentColor'
        />
    </Icon>
);
