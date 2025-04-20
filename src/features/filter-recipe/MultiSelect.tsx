import {
    Checkbox,
    HStack,
    Icon,
    IconButton,
    IconProps,
    Input,
    useControllableState,
    useMergeRefs,
} from '@chakra-ui/react';
import {
    chakraComponents,
    ChakraStylesConfig,
    GroupBase,
    MultiValue,
    OptionBase,
    Select,
    SelectComponentsConfig,
    SelectInstance,
} from 'chakra-react-select';
import { useEffect, useRef } from 'react';

export interface Option extends OptionBase {
    label: string;
    value: string;
}

export interface MultiSelectProps {
    disabled?: boolean;
    placeholder?: string;
    menuInputPlaceholder?: string;
    value?: MultiValue<Option>;
    options?: Option[];
    onChange?: (value: MultiValue<Option>) => void;
}

export const MultiSelect = ({
    value,
    onChange,
    disabled,
    options,
    placeholder,
    menuInputPlaceholder,
}: MultiSelectProps) => {
    const [_value, setValue] = useControllableState({ value, onChange, defaultValue: [] });
    const selectRef = useRef<SelectInstance<Option, true>>(null);
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
        if (!select) return;

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
    }, []);

    return (
        <Select<Option, true, GroupBase<Option>>
            isMulti
            value={_value}
            options={options}
            ref={selectRef}
            menuRef={menuRef}
            tagVariant='outline'
            isDisabled={disabled}
            controlRef={controlRef}
            onChange={setValue}
            menuPortalTarget={document.body}
            components={components}
            hideSelectedOptions={false}
            backspaceRemovesValue={false}
            closeMenuOnSelect={false}
            tabSelectsValue={false}
            isSearchable={false}
            placeholder={placeholder}
            chakraStyles={chakraStyles}
            menuButtonProps={{ onClick: addCustomValue }}
            menuInputProps={{
                ref: menuInputRef,
                placeholder: menuInputPlaceholder,
                onKeyDown: (e) => e.key === 'Enter' && addCustomValue(),
                onBlur: (e) => {
                    if (!controlRef.current?.contains(e.relatedTarget)) {
                        selectRef.current?.focus();
                        selectRef.current?.blur();
                    }
                },
            }}
        />
    );
};

const components: SelectComponentsConfig<Option, true, GroupBase<Option>> = {
    MultiValueRemove: () => null,
    Control: ({ innerRef, selectProps, ...props }) => (
        <chakraComponents.Control
            innerRef={useMergeRefs(innerRef, selectProps.controlRef)}
            selectProps={selectProps}
            {...props}
        />
    ),
    Menu: ({ children, selectProps, innerRef, ...props }) => {
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
    },
    Option: ({ children, isSelected, ...props }) => (
        <chakraComponents.Option isSelected={isSelected} {...props}>
            <Checkbox size='sm' pointerEvents='none' isChecked={isSelected}>
                {children}
            </Checkbox>
        </chakraComponents.Option>
    ),
};

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
        lineHeight: '20px',
        color: 'gray.800',
        _even: { bg: 'none' },
        _odd: { bg: 'blackAlpha.100' },
    }),
    menu: (provided) => ({
        ...provided,
        mt: 0,
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
};

const PlusIcon = (props: IconProps) => (
    <Icon viewBox='0 0 12 12' boxSize='1em' {...props}>
        <path
            d='M12 6C12 7.5913 11.3679 9.11742 10.2426 10.2426C9.11742 11.3679 7.5913 12 6 12C4.4087 12 2.88258 11.3679 1.75736 10.2426C0.632141 9.11742 0 7.5913 0 6C0 4.4087 0.632141 2.88258 1.75736 1.75736C2.88258 0.632141 4.4087 0 6 0C7.5913 0 9.11742 0.632141 10.2426 1.75736C11.3679 2.88258 12 4.4087 12 6V6ZM6.375 3.375C6.375 3.27554 6.33549 3.18016 6.26517 3.10984C6.19484 3.03951 6.09946 3 6 3C5.90054 3 5.80516 3.03951 5.73484 3.10984C5.66451 3.18016 5.625 3.27554 5.625 3.375V5.625H3.375C3.27554 5.625 3.18016 5.66451 3.10984 5.73484C3.03951 5.80516 3 5.90054 3 6C3 6.09946 3.03951 6.19484 3.10984 6.26517C3.18016 6.33549 3.27554 6.375 3.375 6.375H5.625V8.625C5.625 8.72446 5.66451 8.81984 5.73484 8.89017C5.80516 8.96049 5.90054 9 6 9C6.09946 9 6.19484 8.96049 6.26517 8.89017C6.33549 8.81984 6.375 8.72446 6.375 8.625V6.375H8.625C8.72446 6.375 8.81984 6.33549 8.89017 6.26517C8.96049 6.19484 9 6.09946 9 6C9 5.90054 8.96049 5.80516 8.89017 5.73484C8.81984 5.66451 8.72446 5.625 8.625 5.625H6.375V3.375Z'
            fill='currentColor'
        />
    </Icon>
);
