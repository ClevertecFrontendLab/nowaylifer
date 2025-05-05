import { Switch, SwitchProps, useControllableState } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '~/shared/store';

import { applyFilter, resetFilter, selectHasAppliedFilter, selectHasFilter } from '../slice';
import { FilterType } from '../types';

export interface FilterSwitchProps extends Omit<SwitchProps, 'onChange'> {
    filterType: FilterType;
    applyOnChange?: boolean;
    appliedFilter?: boolean;
    onChange?: (checked: boolean) => void;
}

export const FilterSwitch = ({
    filterType,
    applyOnChange,
    appliedFilter,
    onChange,
    isChecked,
    ...props
}: FilterSwitchProps) => {
    const selector = appliedFilter ? selectHasAppliedFilter : selectHasFilter;
    const hasFilter = useAppSelector((state) => selector(state, filterType));
    const [checked, setChecked] = useControllableState({
        value: isChecked,
        onChange,
        defaultValue: hasFilter,
    });
    const prevCheckedRef = useRef(checked);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (hasFilter !== prevCheckedRef.current) {
            setChecked(hasFilter);
        }
    }, [hasFilter, setChecked]);

    useEffect(() => {
        prevCheckedRef.current = checked;
    }, [checked]);

    return (
        <Switch
            isChecked={checked}
            onChange={(e) => {
                const checked = e.target.checked;
                if (!checked) {
                    dispatch(resetFilter(filterType));
                    if (applyOnChange) {
                        dispatch(applyFilter(filterType));
                    }
                }
                setChecked(checked);
                onChange?.(checked);
            }}
            {...props}
        />
    );
};
