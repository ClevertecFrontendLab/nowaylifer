import {
    ListItem,
    ListProps,
    Tag,
    TagCloseButton,
    TagLabel,
    UnorderedList,
} from '@chakra-ui/react';
import { useMemo, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '~/shared/store';
import { TestId } from '~/shared/test-ids';

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
                        data-test-id={TestId.SELECTED_FILER_TAG}
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
            toSortedUniqByReference(
                filters,
                prevFiltersRef.current,
                (item) => item.type + item.value,
            ),
        [filters],
    );

    prevFiltersRef.current = sortedFilters;

    return sortedFilters;
};

/**
 * Returns a new array of unique items from `array`, sorted according to the order defined by `referenceArray`.
 * Items not present in `referenceArray` are appended in original order.
 */
const toSortedUniqByReference = <T,>(
    array: T[],
    referenceArray: T[],
    keyFn: (item: T) => string,
) => {
    const map = new Map(array.map((item) => [keyFn(item), item]));
    const ordered = referenceArray.map((item) => map.get(keyFn(item))).filter(Boolean) as T[];
    ordered.forEach((item) => map.delete(keyFn(item)));
    return [...ordered, ...map.values()];
};
