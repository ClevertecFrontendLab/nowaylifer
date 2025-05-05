import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { chakra, Checkbox, HTMLChakraProps, ListItem, UnorderedList } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '~/shared/store';

import { selectFilter, selectFilterOptions, toggleFilter } from '../slice';
import { FilterOption, FilterType } from '../types';

export interface FilterCheckboxListProps extends HTMLChakraProps<'fieldset'> {
    title: string;
    filterType: FilterType;
    testId?: { option?: (option: FilterOption, idx: number) => string | undefined };
}

export const FilterCheckboxList = ({
    title,
    filterType,
    testId,
    ...props
}: FilterCheckboxListProps) => {
    const filterState = useAppSelector((state) => selectFilter(state, filterType));
    const options = useAppSelector((state) => selectFilterOptions(state, filterType));
    const dispatch = useAppDispatch();
    return (
        <chakra.fieldset mb={{ base: 4, lg: 6 }} {...props}>
            <chakra.legend mb={3} fontWeight='medium'>
                {title}
            </chakra.legend>
            <UnorderedList styleType='none' ml={0} spacing={3}>
                {options.map((o, idx) => (
                    <ListItem key={o.value}>
                        <FilterCheckbox
                            value={o.value}
                            isChecked={filterState.some((f) => o.value === f.value)}
                            onChange={(e) =>
                                dispatch(toggleFilter({ filter: o, flag: e.target.checked }))
                            }
                            data-test-id={testId?.option?.(o, idx) ?? o.testId}
                        >
                            {o.label}
                        </FilterCheckbox>
                    </ListItem>
                ))}
            </UnorderedList>
        </chakra.fieldset>
    );
};

const FilterCheckbox = chakra(Checkbox, {
    baseStyle: {
        display: 'flex',
        [checkboxAnatomy.selectors().label]: {
            fontSize: 'sm',
            lineHeight: 5,
        },
    },
});
