import { redirect, unstable_MiddlewareFunction } from 'react-router';

import { storeContext } from '~/shared/router';

import { selectActiveCategories } from '../selectors';
import { CategoryParams } from './util';

const paramsSet = new Set(CategoryParams.order);

export const validateCategoryParamsMiddleware: unstable_MiddlewareFunction = (
    { params, context },
    next,
) => {
    const store = context.get(storeContext);
    const categoryParamsLength = Object.keys(params).reduce(
        (count, param) => count + (paramsSet.has(param) ? 1 : 0),
        0,
    );
    const activeCategories = selectActiveCategories(store.getState(), params);
    if (activeCategories.length < categoryParamsLength) {
        throw redirect('/not-found');
    }
    return next();
};
