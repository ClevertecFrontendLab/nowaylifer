import invariant from 'invariant';
import { Navigate, Outlet } from 'react-router';

import { useActiveCategories } from './use-active-categories';
import { buildCategoryPath } from './util';

export const NavigateToSubCategory = () => {
    const [rootCategory, subCategory] = useActiveCategories();
    if (subCategory) return <Outlet />;
    invariant(!!rootCategory, 'Root category is undefined');
    const firstSubCategory = rootCategory.subCategories[0];
    return <Navigate to={buildCategoryPath(rootCategory, firstSubCategory)} />;
};
