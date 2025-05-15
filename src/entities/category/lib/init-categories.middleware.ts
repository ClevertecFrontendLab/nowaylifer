import { createAction } from '@reduxjs/toolkit';
import { unstable_MiddlewareFunction } from 'react-router';

import { showAppLoaderWhilePendingThunk } from '~/shared/infra/app-loader';
import { storeContext } from '~/shared/router';

import { categoryApi, CategoryState } from '../api';
import { selectCategories } from '../selectors';
import { CATEGORY_STORAGE_KEY } from './util';

export const initCategoriesMiddleware: unstable_MiddlewareFunction = async ({ context }, next) => {
    const { dispatch, getState } = context.get(storeContext);

    const categories = selectCategories(getState());
    if (categories) return next();

    const storedData = localStorage.getItem(CATEGORY_STORAGE_KEY);
    if (!storedData) {
        await dispatch(fetchCategoriesThunk);
        return next();
    }

    let value: CategoryState;
    try {
        value = JSON.parse(storedData);
    } catch {
        localStorage.removeItem(CATEGORY_STORAGE_KEY);
        await dispatch(fetchCategoriesThunk);
        return next();
    }

    dispatch(hydrateCategoriesThunk(value));
    dispatch(showAppLoaderWhilePendingThunk(dispatch(fetchCategoriesThunk)));

    return next();
};

export const categoriesHydrated = createAction<CategoryState>('category/hydrate');

const fetchCategoriesThunk = (dispatch: AppDispatch) =>
    dispatch(
        categoryApi.endpoints.categories.initiate(undefined, {
            forceRefetch: true,
            subscribe: false,
        }),
    ).unwrap();

const hydrateCategoriesThunk = (value: CategoryState) => (dispatch: AppDispatch) => {
    dispatch(
        categoryApi.util.upsertQueryEntries([
            { endpointName: 'categories', value, arg: undefined },
        ]),
    );
    dispatch(categoriesHydrated(value));
};
