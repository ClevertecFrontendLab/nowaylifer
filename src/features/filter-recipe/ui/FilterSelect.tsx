import { useAppDispatch, useAppSelector } from '~/shared/store';

import { filterOptions } from '../filter-options';
import { applyFilter, selectAppliedFilter, selectFilter, setFilter } from '../slice';
import { FilterType } from '../types';
import { MultiSelect, MultiSelectProps } from './MultiSelect';

export interface FilterSelectProps extends Omit<MultiSelectProps, 'options'> {
    filterType: FilterType;
    appliedFilter?: boolean;
    applyOnChange?: boolean;
}

export const FilterSelect = ({
    filterType,
    appliedFilter = false,
    applyOnChange = false,
    ...props
}: FilterSelectProps) => {
    const selector = appliedFilter ? selectAppliedFilter : selectFilter;
    const filterState = useAppSelector((state) => selector(state, filterType));
    const dispatch = useAppDispatch();
    return (
        <MultiSelect
            value={filterState}
            options={filterOptions[filterType]}
            onChange={(value) => {
                dispatch(
                    setFilter({
                        type: filterType,
                        filters: value.map((v) => ({ type: filterType, ...v })),
                    }),
                );
                if (applyOnChange) {
                    dispatch(applyFilter(filterType));
                }
            }}
            {...props}
        />
    );
};
