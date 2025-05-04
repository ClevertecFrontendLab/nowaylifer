import { Params } from 'react-router';

import { Category, RootCategory, SubCategory } from '../interface';

export const isSubCategory = (value: Category | SubCategory): value is SubCategory =>
    'rootCategoryId' in value && typeof value.rootCategoryId === 'string';

export const isRootCategory = (value: Category | SubCategory): value is RootCategory =>
    !isSubCategory(value);

export const CategoryParams = {
    RootCategory: {
        param: 'rootcategory',
        pattern: ':rootcategory',
    },
    SubCategory: {
        param: 'subcategory',
        pattern: ':subcategory',
    },
    get order() {
        return [this.RootCategory.param, this.SubCategory.param];
    },
    getSortedSlugs(params: Params<string>) {
        const result: string[] = [];
        for (const param of this.order) {
            const slug = params[param];
            if (!slug) break;
            result.push(slug);
        }
        return result;
    },
};

export type ActiveCategories = [RootCategory, ...SubCategory[]];
export type MaybeActiveCategories = [RootCategory?, ...(SubCategory | undefined)[]];

export const CATEGORY_STORAGE_KEY = 'category';
