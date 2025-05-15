export type { CategoryById } from '../api';
export type { Category, RootCategory, SubCategory } from '../interface';
export {
    type ActiveCategories,
    buildCategoryPath,
    isRootCategory,
    isSubCategory,
    type MaybeActiveCategories,
} from '../lib/util';
