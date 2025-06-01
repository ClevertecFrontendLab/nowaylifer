import { isString } from 'lodash-es';
import { Params } from 'react-router';

import { RouteParam, RoutePath } from '~/shared/router';

import { Category, RootCategory, SubCategory } from '../types';

export const isSubCategory = (value: Category | SubCategory): value is SubCategory =>
    'rootCategoryId' in value && isString(value.rootCategoryId);

export const isRootCategory = (value: Category | SubCategory): value is RootCategory =>
    !isSubCategory(value);

export const buildCategoryPath = (root: RootCategory, sub: SubCategory) =>
    RoutePath.Category.build({ rootCategory: root.category, subCategory: sub.category });

export const categoryParamOrder = [RouteParam.RootCategory, RouteParam.SubCategory];

export const getSortedCategorySlugs = (params: Params) => {
    const result: string[] = [];

    for (const param of categoryParamOrder) {
        const slug = params[param];
        if (!slug) break;
        result.push(slug);
    }

    return result;
};

export type ActiveCategories = [RootCategory, ...SubCategory[]];
export type MaybeActiveCategories = [RootCategory?, ...(SubCategory | undefined)[]];

export const CATEGORY_STORAGE_KEY = 'category';
