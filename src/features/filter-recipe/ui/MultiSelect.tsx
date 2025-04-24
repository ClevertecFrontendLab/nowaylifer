import {
    Button,
    Checkbox,
    HStack,
    Icon,
    IconButton,
    IconButtonProps,
    IconProps,
    Input,
    InputProps,
    SystemStyleObject,
    useControllableState,
    useMergeRefs,
} from '@chakra-ui/react';
import { cx } from '@chakra-ui/utils';
import {
    chakraComponents,
    ChakraStylesConfig,
    ControlProps,
    GroupBase,
    MenuListProps,
    MenuPlacement,
    MenuPosition,
    MenuProps,
    MultiValue,
    OptionBase,
    OptionProps,
    Select,
    SelectInstance,
} from 'chakra-react-select';
import { useEffect, useRef } from 'react';

export interface Option extends OptionBase {
    label: string;
    value: string;
    testId?: string;
}

export type SelectHandle = SelectInstance<Option, true>;

export type MultiSelectProps = SystemStyleObject & {
    ref?: React.Ref<SelectHandle>;
    disabled?: boolean;
    placeholder?: string;
    menuPortalTarget?: HTMLElement | null;
    withMenuInput?: boolean;
    menuInputPlaceholder?: string;
    value?: MultiValue<Option>;
    options?: Option[];
    menuPlacement?: MenuPlacement;
    menuPosition?: MenuPosition;
    minMenuHeight?: number;
    maxMenuHeight?: number;
    menuInputProps?: InputProps;
    menuButtonProps?: Omit<IconButtonProps, 'aria-label'>;
    onChange?: (value: MultiValue<Option>) => void;
    testId?: { control?: string; menu?: string };
};

export const MultiSelect = ({
    value,
    onChange,
    disabled,
    options,
    ref,
    withMenuInput,
    menuPortalTarget,
    placeholder,
    menuPlacement = 'auto',
    menuPosition,
    minMenuHeight,
    maxMenuHeight,
    menuInputPlaceholder,
    menuButtonProps,
    menuInputProps,
    testId,
    ...containerStyles
}: MultiSelectProps) => {
    const [_value, setValue] = useControllableState({ value, onChange, defaultValue: [] });
    const selectRef = useRef<SelectHandle>(null);
    const menuInputRef = useRef<HTMLInputElement>(null);
    const controlRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const addCustomValue = () => {
        const menuInput = menuInputRef.current;
        const inputValue = menuInput?.value?.trim().toLowerCase();
        if (menuInput && inputValue && !_value.find((o) => o.value === inputValue)) {
            setValue((prev) => [...prev, { label: menuInput.value.trim(), value: inputValue }]);
            menuInput.value = '';
            menuInput.focus();
        }
    };

    useEffect(() => {
        const select = selectRef.current;
        if (!withMenuInput || !select) return;

        const isBlurOutsideMenu = (e: React.FocusEvent<HTMLInputElement>) =>
            !e.relatedTarget || !menuRef.current || !menuRef.current.contains(e.relatedTarget);

        const originalMethod = select.onInputBlur;

        select.onInputBlur = (e) => {
            if (isBlurOutsideMenu(e)) {
                originalMethod.call(select, e);
            }
        };

        return () => {
            select.onInputBlur = originalMethod;
        };
    }, [withMenuInput]);

    return (
        <Select<Option, true, GroupBase<Option>>
            isMulti
            testId={testId}
            value={_value}
            options={options}
            ref={useMergeRefs(selectRef, ref)}
            menuRef={menuRef}
            tagVariant='outline'
            menuPlacement={menuPlacement}
            menuPosition={menuPosition}
            isDisabled={disabled}
            controlRef={controlRef}
            onChange={setValue}
            menuPortalTarget={menuPortalTarget}
            maxMenuHeight={maxMenuHeight}
            minMenuHeight={minMenuHeight}
            components={{
                Option,
                Control,
                MenuList,
                MultiValueRemove,
                Menu: withMenuInput ? MenuWithInput : chakraComponents.Menu,
            }}
            hideSelectedOptions={false}
            backspaceRemovesValue={false}
            closeMenuOnSelect={false}
            tabSelectsValue={false}
            isSearchable={false}
            placeholder={placeholder}
            chakraStyles={{
                ...chakraStyles,
                container: (provided) => ({ ...provided, w: 'full', ...containerStyles }),
            }}
            menuButtonProps={
                withMenuInput ? { onClick: addCustomValue, ...menuButtonProps } : undefined
            }
            menuInputProps={
                withMenuInput
                    ? {
                          ref: menuInputRef,
                          placeholder: menuInputPlaceholder,
                          onKeyDown: (e) => e.key === 'Enter' && addCustomValue(),
                          onBlur: (e) => {
                              if (!controlRef.current?.contains(e.relatedTarget)) {
                                  selectRef.current?.focus();
                                  selectRef.current?.blur();
                              }
                          },
                          ...menuInputProps,
                      }
                    : undefined
            }
        />
    );
};

const Control = ({ selectProps, innerRef, innerProps, ...props }: ControlProps<Option, true>) => (
    <chakraComponents.Control
        innerRef={useMergeRefs(innerRef, selectProps.controlRef)}
        selectProps={selectProps}
        innerProps={{
            ...innerProps,
            ['as' as string]: Button,
            ['variant' as string]: 'unstyled',
            ['disabled' as string]: selectProps.isDisabled,
            'data-test-id': selectProps.testId?.control,
        }}
        {...props}
    />
);

const MenuList = ({
    className,
    innerProps,
    selectProps,
    ...props
}: MenuListProps<Option, true>) => (
    <chakraComponents.MenuList
        className={cx(className, 'custom-scrollbar')}
        innerProps={{ ...innerProps, 'data-test-id': selectProps.testId?.menu }}
        selectProps={selectProps}
        {...props}
    />
);

const MultiValueRemove = () => null;

const MenuWithInput = ({ selectProps, innerRef, children, ...props }: MenuProps<Option, true>) => {
    const { menuInputProps, menuButtonProps, menuFooterProps, menuRef } = selectProps;
    const { onKeyDown, onTouchEnd, onMouseDown, ...inputProps } = menuInputProps ?? {};
    const ref = useMergeRefs(menuRef, innerRef);
    return (
        <chakraComponents.Menu innerRef={ref} selectProps={selectProps} {...props}>
            {children}
            <HStack bg='white' py={2} pl={6} pr={2} {...menuFooterProps}>
                <Input
                    size='sm'
                    borderRadius='base'
                    onTouchEnd={(e) => {
                        e.stopPropagation();
                        onTouchEnd?.(e);
                    }}
                    onMouseDown={(e) => {
                        e.stopPropagation();
                        onMouseDown?.(e);
                    }}
                    onKeyDown={(e) => {
                        e.stopPropagation();
                        onKeyDown?.(e);
                    }}
                    {...inputProps}
                />
                <IconButton
                    variant='ghost'
                    size='xs'
                    color='lime.600'
                    aria-label='Добавить в список'
                    icon={<PlusIcon />}
                    {...menuButtonProps}
                />
            </HStack>
        </chakraComponents.Menu>
    );
};

const Option = ({
    children,
    isSelected,
    data,
    innerProps,
    ...props
}: OptionProps<Option, true>) => (
    <chakraComponents.Option
        data={data}
        isSelected={isSelected}
        innerProps={{ ...innerProps, 'data-test-id': data.testId }}
        {...props}
    >
        <Checkbox size='sm' pointerEvents='none' isChecked={isSelected}>
            {children}
        </Checkbox>
    </chakraComponents.Option>
);

const chakraStyles: ChakraStylesConfig<Option, true, GroupBase<Option>> = {
    valueContainer: (provided) => ({ ...provided, py: 2, columnGap: 2, rowGap: 1 }),
    multiValueLabel: (provided) => ({
        ...provided,
        fontSize: 'xs',
    }),
    multiValue: (provided) => ({
        ...provided,
        minHeight: 5,
        m: 0,
        boxShadow: 'none',
        borderWidth: '1px',
        color: 'lime.600',
        borderColor: 'lime.400',
    }),
    option: (provided) => ({
        ...provided,
        fontSize: 'sm',
        paddingBlock: 1.5,
        paddingInline: 4,
        lineHeight: 5,
        color: 'gray.800',
        _even: { bg: 'none' },
        _odd: { bg: 'blackAlpha.100' },
    }),
    menu: (provided) => ({
        ...provided,
        my: 0,
        borderRadius: 'base',
        overflow: 'hidden',
        borderWidth: '1px',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.06), 0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    }),
    menuList: (provided) => ({
        ...provided,
        pb: 0,
        boxShadow: 'none',
        border: 'none',
        borderRadius: 0,
    }),
    placeholder: (provided) => ({ ...provided, color: 'blackAlpha.700' }),
    container: (provided) => ({ ...provided, w: 'full' }),
    dropdownIndicator: (provided, { selectProps: { menuIsOpen } }) => ({
        ...provided,
        transform: `rotate(${menuIsOpen ? 180 : 0}deg)`,
    }),
    control: (provided) => ({
        ...provided,
        fontWeight: 'normal',
        textAlign: 'start',
        _disabled: { opacity: 1 },
    }),
};

const PlusIcon = (props: IconProps) => (
    <Icon viewBox='0 0 12 12' boxSize='1em' {...props}>
        <path
            d='M12 6C12 7.5913 11.3679 9.11742 10.2426 10.2426C9.11742 11.3679 7.5913 12 6 12C4.4087 12 2.88258 11.3679 1.75736 10.2426C0.632141 9.11742 0 7.5913 0 6C0 4.4087 0.632141 2.88258 1.75736 1.75736C2.88258 0.632141 4.4087 0 6 0C7.5913 0 9.11742 0.632141 10.2426 1.75736C11.3679 2.88258 12 4.4087 12 6V6ZM6.375 3.375C6.375 3.27554 6.33549 3.18016 6.26517 3.10984C6.19484 3.03951 6.09946 3 6 3C5.90054 3 5.80516 3.03951 5.73484 3.10984C5.66451 3.18016 5.625 3.27554 5.625 3.375V5.625H3.375C3.27554 5.625 3.18016 5.66451 3.10984 5.73484C3.03951 5.80516 3 5.90054 3 6C3 6.09946 3.03951 6.19484 3.10984 6.26517C3.18016 6.33549 3.27554 6.375 3.375 6.375H5.625V8.625C5.625 8.72446 5.66451 8.81984 5.73484 8.89017C5.80516 8.96049 5.90054 9 6 9C6.09946 9 6.19484 8.96049 6.26517 8.89017C6.33549 8.81984 6.375 8.72446 6.375 8.625V6.375H8.625C8.72446 6.375 8.81984 6.33549 8.89017 6.26517C8.96049 6.19484 9 6.09946 9 6C9 5.90054 8.96049 5.80516 8.89017 5.73484C8.81984 5.66451 8.72446 5.625 8.625 5.625H6.375V3.375Z'
            fill='currentColor'
        />
    </Icon>
);
