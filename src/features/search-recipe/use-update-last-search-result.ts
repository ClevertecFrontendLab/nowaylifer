import { useEffect } from 'react';

import { Recipe } from '~/entities/recipe';
import { useAppDispatch, useAppSelectorRef } from '~/shared/store';

import { selectSearchString, setIsLastSearchSuccess } from './slice';

export const useUpdateLastSearchResult = (recipes?: Recipe[]) => {
    const searchStringRef = useAppSelectorRef(selectSearchString);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!recipes || !searchStringRef.current) return;
        dispatch(setIsLastSearchSuccess(recipes.length > 0));
    }, [recipes, dispatch, searchStringRef]);
};
