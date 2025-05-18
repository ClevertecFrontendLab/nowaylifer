import { redirect, unstable_MiddlewareFunction } from 'react-router';

import { RoutePath, storeContext } from '~/shared/router';

import { selectActiveCategories } from './selectors';
import { categoryParamOrder } from './util';

const paramsSet = new Set(categoryParamOrder);

export const validateCategoryParamsMiddleware: unstable_MiddlewareFunction = (
    { params, context },
    next,
) => {
    const store = context.get(storeContext);
    const categoryParamsLength = Object.keys(params).filter((param) => paramsSet.has(param)).length;
    const activeCategories = selectActiveCategories(store.getState(), params);

    if (activeCategories.length < categoryParamsLength) {
        throw redirect(RoutePath.NotFound);
    }

    return next();
};
