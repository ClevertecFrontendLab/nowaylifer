import { createAction } from '@reduxjs/toolkit';
import { unstable_MiddlewareFunction } from 'react-router';

import { storeContext } from '~/shared/router';

import { categoryApi } from '../api';
import { CategoryState } from '../types';
import { selectCategories } from './selectors';
import { CATEGORY_STORAGE_KEY } from './util';

export const initCategoriesMiddleware: unstable_MiddlewareFunction = async ({ context }, next) => {
    const { dispatch, getState } = context.get(storeContext);

    const categories = selectCategories(getState());
    if (categories) return next();

    const storedData = localStorage.getItem(CATEGORY_STORAGE_KEY);
    if (!storedData) {
        await dispatch(fetchCategories());
        return next();
    }

    let value: CategoryState;
    try {
        value = JSON.parse(storedData);
    } catch {
        localStorage.removeItem(CATEGORY_STORAGE_KEY);
        await dispatch(fetchCategories());
        return next();
    }

    dispatch(hydrateCategories(value));
    dispatch(fetchCategories());

    return next();
};

export const categoriesHydrated = createAction<CategoryState>('category/hydrated');

const fetchCategories = () => (dispatch: AppDispatch) =>
    dispatch(
        categoryApi.endpoints.categories.initiate(undefined, {
            forceRefetch: true,
            subscribe: false,
        }),
    ).unwrap();

const hydrateCategories = (value: CategoryState) => (dispatch: AppDispatch) => {
    dispatch(
        categoryApi.util.upsertQueryEntries([
            { endpointName: 'categories', value, arg: undefined },
        ]),
    );
    dispatch(categoriesHydrated(value));
};
