import { shallowEqual } from 'react-redux';
import { useParams } from 'react-router';

import { useAppSelector } from '~/shared/store';

import { selectActiveCategories, selectActiveCategoriesInvariant } from '../selectors';
import { ActiveCategories, MaybeActiveCategories } from './util';

export function useActiveCategories(isInvariant?: false): MaybeActiveCategories;
export function useActiveCategories(isInvariant: true): ActiveCategories;
export function useActiveCategories(isInvariant = false) {
    const params = useParams();
    const selector = isInvariant ? selectActiveCategoriesInvariant : selectActiveCategories;
    return useAppSelector((state) => selector(state, params), shallowEqual);
}
