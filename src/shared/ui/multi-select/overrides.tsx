import { Checkbox } from '@chakra-ui/react';
import { runIfFn } from '@chakra-ui/utils';
import { memo } from 'react';

import {
    MultiSelect as BaseMultiSelect,
    MultiSelectItem as BaseMultiSelectItem,
    MultiSelectItemProps,
    MultiSelectMenu as BaseMultiSelectMenu,
    MultiSelectMenuList as BaseMultiSelectMenuList,
    MultiSelectMenuListProps,
    MultiSelectMenuProps,
    MultiSelectProps,
    MultiSelectTag as BaseMultiSelectTag,
    MultiSelectTagProps,
} from './lib';

export const MultiSelect = <Item,>({ containerProps, ...props }: MultiSelectProps<Item>) => (
    <BaseMultiSelect
        containerProps={{ _disabled: {}, ...containerProps }}
        focusBorderColor='lime.300'
        {...props}
    />
);

export const MultiSelectTag = <Item,>({
    closeButtonProps,
    ...props
}: MultiSelectTagProps<Item>) => (
    <BaseMultiSelectTag
        variant='outline'
        boxShadow='none'
        border='1px'
        color='lime.600'
        borderColor='lime.400'
        closeButtonProps={{ display: 'none', ...closeButtonProps }}
        {...props}
    />
);

export const MultiSelectMenu = (props: MultiSelectMenuProps) => (
    <BaseMultiSelectMenu py={1} {...props} />
);

export const MultiSelectMenuList = (props: MultiSelectMenuListProps) => (
    <BaseMultiSelectMenuList className='custom-scrollbar' maxH='328px' {...props} />
);

const _MultiSelectItem = <Item,>({ children, ...props }: MultiSelectItemProps<Item>) => (
    <BaseMultiSelectItem
        _focus={{}}
        _selected={{}}
        _active={{}}
        _odd={{ bg: 'blackAlpha.100' }}
        {...props}
    >
        {(state) => (
            <Checkbox size='sm' pointerEvents='none' isChecked={state.isSelected}>
                {runIfFn(children, state)}
            </Checkbox>
        )}
    </BaseMultiSelectItem>
);

export const MultiSelectItem = memo(_MultiSelectItem) as typeof _MultiSelectItem;
