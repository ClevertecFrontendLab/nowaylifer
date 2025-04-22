import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { chakra, Checkbox, HTMLChakraProps, ListItem, UnorderedList } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '~/shared/store';

import { filterOptions } from '../filter-options';
import { selectFilter, toggleFilter } from '../slice';
import { FilterType } from '../types';

export const FilterCheckboxList = ({
    title,
    filterType,
    ...props
}: {
    title: string;
    filterType: FilterType;
} & HTMLChakraProps<'fieldset'>) => {
    const filterState = useAppSelector((state) => selectFilter(state, filterType));
    const dispatch = useAppDispatch();
    return (
        <chakra.fieldset mb={{ base: 4, lg: 6 }} {...props}>
            <chakra.legend mb={3} fontWeight='medium'>
                {title}
            </chakra.legend>
            <UnorderedList styleType='none' ml={0} spacing={3}>
                {filterOptions[filterType].map((o) => (
                    <ListItem key={o.value}>
                        <FilterCheckbox
                            value={o.value}
                            isChecked={!!filterState.find((f) => o.value === f.value)}
                            onChange={(e) =>
                                dispatch(
                                    toggleFilter({
                                        filter: { type: filterType, ...o },
                                        flag: e.target.checked,
                                    }),
                                )
                            }
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
