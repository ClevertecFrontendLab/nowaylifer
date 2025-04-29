import {
    ListItem,
    ListProps,
    Tag,
    TagCloseButton,
    TagLabel,
    UnorderedList,
} from '@chakra-ui/react';
import { type Comparator } from 'lodash';
import { eq, intersectionWith, unionWith } from 'lodash-es';
import { useMemo, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '~/shared/store';

import { removeFilter, selectFilters } from '../slice';
import { Filter } from '../types';

export const SelectedFiltersTagList = (props: ListProps) => {
    const filters = useAppSelector(selectFilters);
    const sortedFilters = usePreviousFilterOrder(filters);
    const dispatch = useAppDispatch();
    return (
        <UnorderedList
            styleType='none'
            display='flex'
            flexWrap='wrap'
            columnGap={4}
            rowGap={2}
            ml={0}
            {...props}
        >
            {sortedFilters.map((filter) => (
                <ListItem key={`${filter.type}-${filter.value}`}>
                    <Tag
                        borderWidth='1px'
                        borderColor='lime.400'
                        bg='lime.100'
                        color='lime.700'
                        data-test-id='filter-tag'
                    >
                        <TagLabel>{filter.label}</TagLabel>
                        <TagCloseButton onClick={() => dispatch(removeFilter(filter))} />
                    </Tag>
                </ListItem>
            ))}
        </UnorderedList>
    );
};

const usePreviousFilterOrder = (filters: Filter[]) => {
    const prevFiltersRef = useRef<Filter[]>([]);

    const sortedFilters = useMemo(
        () =>
            toSortedUniqByArray(
                filters,
                prevFiltersRef.current,
                (a, b) => a.type === b.type && a.value === b.value,
            ),
        [filters],
    );

    prevFiltersRef.current = sortedFilters;

    return sortedFilters;
};

/**
 * Creates an array of unique values from `array` sorted according to the order defined by `byArray`.
 * Elements not present in `byArray` are appended at the end of result array without changing their relative order.
 */
const toSortedUniqByArray = <T,>(array: T[], byArray: T[], comparator: Comparator<T> = eq) => {
    const union = unionWith(byArray, array, comparator);
    return intersectionWith(union, array, comparator);
};
